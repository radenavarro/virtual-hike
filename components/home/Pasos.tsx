
import { StyleSheet, Platform, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useTemplate } from '@/hooks/useTemplate';
import { useTheme } from '@/hooks/useTheme';
import { useSteps } from '@/hooks/home/useSteps';
import { useSaveSteps } from '@/hooks/home/useSaveSteps';
import { useNewDayBehaviour } from '@/hooks/home/useNewDayBehaviour';
import { useAppStore } from '@/zustand/useStore';

export const Pasos = () => {
  const { registro } = useAppStore()
  const { template } = useTemplate('tabs/index')

  const theme = useTheme()

  const { isPedometerAvailable, pastStepCount, currentStepCount } = useSteps()
  const { stepCounter } = theme.colors

  useSaveSteps(currentStepCount)// Guardar en AsyncStorage / Zustand
  useNewDayBehaviour()// Guardar en histórico a final del día y reset registro en AsyncStorage / Zustand

  return (
    <ThemedView style={[{ backgroundColor: stepCounter?.background, borderColor: stepCounter?.border }, styles.container]}>
      {
        !isPedometerAvailable && 
        <ThemedText>{ template.stepCounter?.pedometerDisabledText }</ThemedText>
      }
      <ThemedText type="title">{ template.stepCounter?.title }</ThemedText>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}>
        <ThemedText type="title">{ registro.pasos } </ThemedText><ThemedText>{ template.stepCounter?.stepCounterText }</ThemedText>
      </View>
      
      <ThemedText>{ template.stepCounter?.pastStepCounterText }: { pastStepCount }</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginHorizontal: 'auto',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    minHeight: 156
  },
});

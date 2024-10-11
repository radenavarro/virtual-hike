
import { StyleSheet, Platform, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useTemplate } from '@/hooks/useTemplate';
import { useTheme } from '@/hooks/useTheme';
import { useSteps } from '@/hooks/home/useSteps';
import { useSaveSteps } from '@/hooks/home/useSaveSteps';
import { useNewDayBehaviour } from '@/hooks/home/useNewDayBehaviour';
import { useAppStore } from '@/zustand/useStore';
import { Ruta, TemplateIndex } from '@/app/types';
import dayjs from 'dayjs';
import { objectiveConvert } from '@/app/helpers/helpers';

export const Pasos = () => {
  const { registro } = useAppStore()
  const { template } = useTemplate<TemplateIndex>('tabs/index')

  const theme = useTheme()

  const selectedRuta = useAppStore(state => state.selectedRuta)
  const allRutas = useAppStore(state => state.ruta)
  const inicioDeRuta = useAppStore(state => state.inicioRuta)
  const pasosDeRuta = useAppStore(state => state.pasosRuta)

  const { isPedometerAvailable, pastStepCount, currentStepCount } = useSteps()
  const { stepCounter } = theme.colors

  useSaveSteps(currentStepCount)// Guardar en AsyncStorage / Zustand
  useNewDayBehaviour()// Guardar en histórico a final del día y reset registro en AsyncStorage / Zustand

  function calcPercent() {
    const rutaSel = allRutas.find(ruta => ruta.uuid === selectedRuta)
    const duracion = rutaSel?.splits?.reduce((a, b) => a + b.duracion, 0)

    if (!registro.pasos || !duracion) return 0
    
    const calculatedPercent = objectiveConvert(registro.pasos, 'pasos') / duracion * 100
    return calculatedPercent > 100 ? 100 : calculatedPercent
  }

  return (
    <ThemedView style={[
      styles.container,
      { 
        backgroundColor: stepCounter?.background, 
        borderColor: stepCounter?.border,
        minHeight: selectedRuta ? 400 : 156
      }, 
    ]}>
      {
        !isPedometerAvailable && 
        <ThemedText>{ template.stepCounter?.pedometerDisabledText }</ThemedText>
      }
      {
        selectedRuta && (
          <>
            <ThemedText type="subtitle">Ruta actual</ThemedText>
            <ThemedText type="title">{ allRutas.find(ruta => ruta.uuid === selectedRuta)?.nombre }</ThemedText>
            <ThemedText type='subtitle'>Iniciada: { inicioDeRuta || "" }</ThemedText>
            <ThemedText type='subtitle'>Progreso: </ThemedText>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}>
              <ThemedText type='title'>{pasosDeRuta || 0} </ThemedText><ThemedText>{template.stepCounter?.stepCounterText}</ThemedText>
            </View>
            {/* Barra de progreso */}
            <ThemedView style={{backgroundColor: 'black', height: 10, width: '100%'}}>
              <ThemedView style={{
                backgroundColor: 'green', 
                height: 10, 
                width: `${calcPercent()}%`
              }}></ThemedView>
            </ThemedView>
          </>
        )
      }
      <ThemedText type={selectedRuta ? "defaultSemiBold" : "title"}>Hoy: { template.stepCounter?.title }</ThemedText>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}>
        <ThemedText type={selectedRuta ? "defaultSemiBold" : "title"}>{ registro.pasos } </ThemedText><ThemedText>{ template.stepCounter?.stepCounterText }</ThemedText>
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
  },
});

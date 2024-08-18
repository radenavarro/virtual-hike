
import { useState, useEffect } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Pedometer } from 'expo-sensors';
import { useTemplate } from '@/hooks/useTemplate';
import { useTheme } from '@/hooks/useTheme';
import { useSteps } from '@/hooks/home/useSteps';

export const Pasos = () => {
  const {template} = useTemplate('tabs/index')

  const theme = useTheme()

  const { isPedometerAvailable, pastStepCount, currentStepCount } = useSteps()

  const {stepCounter} = theme.colors
  return (
    <ThemedView style={[{backgroundColor: stepCounter?.background, borderColor: stepCounter?.border}, styles.container]}>
      {/* <ThemedText>Pedometer.isAvailableAsync(): {isPedometerAvailable}</ThemedText> */}
      <ThemedText type="subtitle">{template.stepCounter?.title}</ThemedText>
      <View style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center"}}>
        <ThemedText type="title">{currentStepCount} </ThemedText><ThemedText>{template.stepCounter?.stepCounterText}</ThemedText>
      </View>
      
      <ThemedText>{template.stepCounter?.pastStepCounterText}: {pastStepCount}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginHorizontal: 'auto',
    borderRadius: 16,
    padding: 8
  },
});


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
import { useEffect, useState } from 'react';
import { usePath } from '@/hooks/home/usePath';

export const Pasos = () => {
  // STORE
  const selectedRuta = useAppStore(state => state.selectedRuta)
  const inicioDeRuta = useAppStore(state => state.inicioRuta)
  const pasosDeRuta = useAppStore(state => state.pasosRuta)

  // CUSTOM HOOKS
  const { registro } = useAppStore()
  const { template } = useTemplate<TemplateIndex>('tabs/index')
  const { isPedometerAvailable, pastStepCount, currentStepCount } = useSteps()
  const { rutaActiva, splitActual, tiempoRestante } = usePath()
  const theme = useTheme()
  useSaveSteps(currentStepCount)// Guardar en AsyncStorage / Zustand
  useNewDayBehaviour()// Guardar en histórico a final del día y reset registro en AsyncStorage / Zustand

  const { stepCounter } = theme.colors

  function calcPercent() {
    const ultimoSplit = rutaActiva?.splits?.[rutaActiva?.splits?.length - 1]
    const duracion = (ultimoSplit?.km || 0) + (ultimoSplit?.duracion || 0)

    if (!pasosDeRuta || !duracion) return 0
    
    const calculatedPercent = objectiveConvert(pasosDeRuta, 'pasos') / duracion * 100
    return calculatedPercent > 100 ? 100 : calculatedPercent
  }

  function tiempoFaltante() {
    if (!tiempoRestante) return ''
    return (Object.entries(tiempoRestante)?.filter(([nom, valor]) => {
      return (!!valor)
    })?.map(([nom, valor]) => {
      const capitalizedNom = nom.charAt(0).toUpperCase() + nom.slice(1)
      return `${valor} ${capitalizedNom}`
    }))?.join(", ")
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
            <ThemedText type="title">{ rutaActiva?.nombre }</ThemedText>
            <ThemedText type='subtitle'>Iniciada: { inicioDeRuta || "" }</ThemedText>
            <ThemedText type='subtitle'>Progreso: </ThemedText>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}>
              <ThemedText type='title'>{pasosDeRuta || 0} </ThemedText><ThemedText>{template.stepCounter?.stepCounterText}</ThemedText>
            </View>
            {/* Barra de progreso */}
            <ThemedView style={{backgroundColor: theme.colors.background, height: 10, width: '100%'}}>
              <ThemedView style={{
                backgroundColor: theme.colors.button.success.color, 
                height: 10, 
                width: `${calcPercent()}%`
              }}></ThemedView>
            </ThemedView>
            <ThemedText style={{fontSize: 10, lineHeight: 10}}>Punto {splitActual?.nombre || " - "} | Km: {objectiveConvert(pasosDeRuta, 'pasos')} | Faltan: {tiempoFaltante()}</ThemedText>
          </>
        )
      }
      <ThemedText type={selectedRuta ? "defaultSemiBold" : "title"}>Hoy: { template.stepCounter?.title }</ThemedText>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", alignItems: "center" }}>
        <ThemedText type={selectedRuta ? "defaultSemiBold" : "title"}>{ registro.pasos } </ThemedText><ThemedText>{ template.stepCounter?.stepCounterText }</ThemedText>
      </View>
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

import { useAppStore } from "@/zustand/useStore"
import { useEffect, useRef } from "react"

/**
 * Guarda la info de pasos en el store / AsyncStorage
 * 
 * @param currentStepCount pasos dados tras abrir la app
 */
export const useSaveSteps = (currentStepCount: number) => {
  const { registro, setRegistro, pasosRuta, selectedRuta, setPasosRuta } = useAppStore();
  const puntuacion = useAppStore(state => state.puntuacion)
  const prev = useRef(currentStepCount);
  
  useEffect(() => {
    guardarRegistro()
  }, [currentStepCount])

  const guardarRegistro = () => {
    const diff = currentStepCount - prev.current
    setRegistro({
      ...registro,
      puntuacion,
      pasos: ((registro.pasos || 0) + diff),
    })
    if (selectedRuta) {
      setPasosRuta((pasosRuta || 0) + diff)
    }
    prev.current = currentStepCount
  }
}
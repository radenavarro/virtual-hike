import { useAppStore } from "@/zustand/useStore"
import { useEffect, useRef } from "react"

export const useScore = () => {
  const sumPuntuacion = useAppStore(state => state.sumPuntuacion)
  const registro = useAppStore(state => state.registro)
  const prevCheckpoint = useRef(registro.pasos)

  /**
   * Objetivos que van a dar puntos al user
   */
  const metasPuntuacion = {
    cada: {
      x: {pasos: 50, puntos: 1},
    },
    [registro?.objetivo?.diario ?? 10000]: 10
  }

  useEffect(() => {
    if (registro.pasos && prevCheckpoint.current ) {
      // Sumar puntos cuando un user pasa por un checkpoint repetible
      if ((registro.pasos - prevCheckpoint.current > metasPuntuacion.cada.x.pasos)){
        const puntosGanados = metasPuntuacion.cada.x.puntos
        console.log(puntosGanados)
        sumPuntuacion(puntosGanados)
        prevCheckpoint.current = registro.pasos
      }
      // Resetear el checkpoint, para cuando cambia el día y, por lo tanto, se resetea el registro diario
      if (prevCheckpoint.current > registro.pasos) {
        prevCheckpoint.current = registro.pasos
      }
    }
  },[registro.pasos])
}
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathActive } from "./usePathActive"
import { usePathTimeRemaining } from "./usePathTimeRemaining"
import { useAppStore } from "@/zustand/useStore"
import { objectiveConvert } from "@/app/helpers/helpers"

type EstadosRuta = "pendiente" | "en progreso" | "terminada"
type ExitoValores = "si" | "no" | undefined
export const usePathFinished = () => {
  // const [success, setSuccess] = useState<ExitoValores>(undefined)
  // const [pathStatus, setPathStatus] = useState<EstadosRuta>("pendiente")

  const success = useRef<ExitoValores>(undefined)
  const pathStatus = useRef<EstadosRuta>("pendiente")

  const pasosDeRuta = useAppStore(state => state.pasosRuta)

  const { rutaActiva } = usePathActive()
  const { tiempoRestante } = usePathTimeRemaining()

  useEffect(() => {
    handlePathStatus()
  }, [rutaActiva, tiempoRestante])

  const handlePathStatus = useCallback(() => {
    if (!rutaActiva || !tiempoRestante) {
      pathStatus.current = "pendiente"
      return
    }
    const ultimoSplit = rutaActiva?.splits?.[rutaActiva?.splits?.length - 1]
    const duracion = (ultimoSplit?.km || 0) + (ultimoSplit?.duracion || 0)
    const kmsAndados = objectiveConvert(pasosDeRuta, 'pasos')

    const quedaTiempo = Object.values(tiempoRestante).some(valor => valor > 0)
    let exito: ExitoValores = success.current;
    let estadoRuta: EstadosRuta = pathStatus.current;

    if (quedaTiempo) {
      estadoRuta = "en progreso"
      exito = undefined
    }

    if (quedaTiempo && (kmsAndados >= duracion)) {
      estadoRuta = "terminada"
      exito = "si"
    }

    if (!quedaTiempo && (Object.keys(tiempoRestante).length > 0) && (kmsAndados < duracion)) {
      estadoRuta = "terminada"
      exito = "no"
    }

    if (exito !== success.current) success.current = exito
    if (estadoRuta !== pathStatus.current) pathStatus.current = estadoRuta
  }, [pathStatus, success, rutaActiva, tiempoRestante, pasosDeRuta])

  return ({ pathStatus: pathStatus.current, success: success.current })
}
import { useEffect, useState } from "react"
import { usePathActive } from "./usePathActive"
import { usePathTimeRemaining } from "./usePathTimeRemaining"
import { useAppStore } from "@/zustand/useStore"
import { objectiveConvert } from "@/app/helpers/helpers"

type EstadosRuta = "pendiente" | "en progreso" | "terminada"
type ExitoValores = "si" | "no" | undefined
export const usePathFinished = () => {
  const [success, setSuccess] = useState<ExitoValores>(undefined)
  const [status, setStatus] = useState<EstadosRuta>("pendiente")

  const pasosDeRuta = useAppStore(state => state.pasosRuta)

  const { rutaActiva } = usePathActive()
  const { tiempoRestante } = usePathTimeRemaining()

  useEffect(() => {
    handlePathStatus()
  }, [rutaActiva, tiempoRestante])

  function handlePathStatus() {
    if (!rutaActiva || !tiempoRestante) {
      return setStatus("pendiente")
    }
    const ultimoSplit = rutaActiva?.splits?.[rutaActiva?.splits?.length - 1]
    const duracion = (ultimoSplit?.km || 0) + (ultimoSplit?.duracion || 0)
    const kmsAndados = objectiveConvert(pasosDeRuta, 'pasos')

    const quedaTiempo = Object.values(tiempoRestante).some(valor => valor > 0)
    let exito: ExitoValores = success;
    let estadoRuta: EstadosRuta = status;

    if (quedaTiempo) {
      estadoRuta = "en progreso"
      exito = undefined
    }

    if (quedaTiempo && kmsAndados >= duracion) {
      estadoRuta = "terminada"
      exito = "si"
    }
    if (!quedaTiempo && kmsAndados < duracion) {
      estadoRuta = "terminada"
      exito = "no"
    }

    if (exito !== success) setSuccess(exito)
    if (estadoRuta !== status) setStatus(estadoRuta)
  }

  return { status, success }
}
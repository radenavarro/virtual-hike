import { Ruta } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { usePathActive } from "./usePathActive"

export const usePathTimeLimit = () => {
  // const [rutaActiva, setRutaActiva] = useState<Ruta | undefined>(undefined)
  const [tiempoLimiteRuta, setTiempoLimiteRuta] = useState<dayjs.Dayjs | undefined>(undefined)

  const { rutaActiva } = usePathActive()

  const inicioRuta = useAppStore(state => state.inicioRuta)

  useEffect(() => {
    let tiempo = (inicioRuta && rutaActiva) ? dayjs(inicioRuta, 'DD-MM-YYYY HH:mm').add(rutaActiva.dias || 0, 'days') : undefined
    setTiempoLimiteRuta(tiempo)
  }, [rutaActiva])

  return { tiempoLimiteRuta }
}
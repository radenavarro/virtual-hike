import { objectiveConvert } from "@/app/helpers/helpers"
import { Split } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import { useEffect, useState } from "react"
import customParseFormat from "dayjs/plugin/customParseFormat"
import duration from 'dayjs/plugin/duration';
import { usePathActive } from "./usePathActive"
import { usePathTimeRemaining } from "./usePathTimeRemaining"
import dayjs from "dayjs"

dayjs.extend(duration)
dayjs.extend(customParseFormat)

export const usePath = () => {
  const [splitActual, setSplitActual] = useState<Split | undefined>(undefined)

  const pasosRuta = useAppStore(state => state.pasosRuta)
  const inicioRuta = useAppStore(state => state.inicioRuta)

  const { tiempoRestante } = usePathTimeRemaining()
  const { rutaActiva } = usePathActive()

  useEffect(() => {
    if (!inicioRuta || !pasosRuta || !rutaActiva) return
    calcularSplitActual()
  },[inicioRuta, pasosRuta, rutaActiva])

  function calcularSplitActual() {
    const kmsRecorridos = objectiveConvert(pasosRuta, 'pasos')
    let km = 0
    let splitRecorriendo = undefined

    rutaActiva?.splits?.forEach((split) => {
      // console.log("KM: " + km)
      
      if (km <= kmsRecorridos && km + split.duracion > kmsRecorridos && kmsRecorridos >= split.km) {
        splitRecorriendo = split
      }

      km += split.duracion
    })

    setSplitActual(splitRecorriendo)
  }

  return {
    rutaActiva,
    splitActual,
    tiempoRestante
  }
}
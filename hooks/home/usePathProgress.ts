import { objectiveConvert } from "@/app/helpers/helpers"
import { Split } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathActive } from "./usePathActive"

export const usePathProgress = () => {
  const splitActual = useRef<Split | undefined>(undefined)

  const pasosRuta = useRef<number>(0)
  useAppStore.subscribe(
    (state) => {
      if (state.pasosRuta != pasosRuta.current) {
        pasosRuta.current = state.pasosRuta
      }
    },
  )

  // const inicioRuta = useAppStore(state => state.inicioRuta)
  const inicioRuta = useRef<string | undefined>(undefined)
  useAppStore.subscribe(
    (state) => {
      if (state.inicioRuta != inicioRuta.current) {
        inicioRuta.current = state.inicioRuta
      }
    },
  )

  const rutaActiva = usePathActive().rutaActiva

  useEffect(() => {
    if (!inicioRuta.current || !pasosRuta.current || !rutaActiva) return
    calcularSplitActual()
  },[inicioRuta.current, pasosRuta.current, rutaActiva])

  function calcularSplitActual() {
    const kmsRecorridos = objectiveConvert(pasosRuta.current, 'pasos')
    let km = 0
    let splitRecorriendo = undefined

    rutaActiva?.splits?.forEach((split) => {
      // console.log("KM: " + km)
      
      if (km <= kmsRecorridos && km + split.duracion > kmsRecorridos && kmsRecorridos >= split.km) {
        splitRecorriendo = split
      }

      km += split.duracion
    })

    splitActual.current = splitRecorriendo
  }

  return useMemo(() => ({ rutaActiva, splitActual: splitActual.current }), [rutaActiva, splitActual.current])
}
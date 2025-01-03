import { Ruta } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import { useEffect, useRef, useState } from "react"

export const usePathActive = () => {
  const rutaActiva = useRef<Ruta | undefined>(undefined)

  const selectedRuta = useAppStore(state => state.selectedRuta)
  const allRutas = useAppStore(state => state.ruta)

  useEffect(() => {
    if (!selectedRuta) rutaActiva.current = (undefined)
    if (allRutas && allRutas.length > 0) {
      rutaActiva.current = (allRutas.find(ruta => ruta.uuid === selectedRuta))
    }
  }, [allRutas, selectedRuta])

  return { rutaActiva: rutaActiva.current }
}
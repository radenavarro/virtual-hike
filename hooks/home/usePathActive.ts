import { Ruta } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import { useEffect, useState } from "react"

export const usePathActive = () => {
  const [rutaActiva, setRutaActiva] = useState<Ruta | undefined>(undefined)

  const selectedRuta = useAppStore(state => state.selectedRuta)
  const allRutas = useAppStore(state => state.ruta)

  useEffect(() => {
    if (!selectedRuta) setRutaActiva(undefined)
    if (allRutas && allRutas.length > 0) {
      setRutaActiva(allRutas.find(ruta => ruta.uuid === selectedRuta))
    }
  }, [allRutas, selectedRuta])

  return { rutaActiva }
}
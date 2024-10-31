import { usePathTimeRemaining } from "./usePathTimeRemaining"
import { usePathProgress } from "./usePathProgress"

export const usePath = () => {
  const { tiempoRestante } = usePathTimeRemaining()
  const { rutaActiva, splitActual } = usePathProgress()

  return {
    rutaActiva,
    splitActual,
    tiempoRestante
  }
}
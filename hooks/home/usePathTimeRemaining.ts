import { useEffect, useState } from "react"
import { useTimer } from "../useTimer";
import { usePathTimeLimit } from "./usePathTimeLimit";
import dayjs from "dayjs";

type TiempoProps = {
  meses: number;
  dias: number;
  horas: number;
  minutos: number;
}

export const usePathTimeRemaining = () => {
  const [tiempoRestante, setTiempoRestante] = useState<TiempoProps | undefined>(undefined)

  const timer = useTimer(1, 5).seconds
  const {tiempoLimiteRuta} = usePathTimeLimit()

  useEffect(() => {
    if (tiempoLimiteRuta) {
      const now = dayjs().format('DD-MM-YYYY HH:mm')
      const diferencia = tiempoLimiteRuta.diff(dayjs(now, 'DD-MM-YYYY HH:mm'))
      const duracion = dayjs.duration(diferencia);
      const meses = duracion.months();
      const dias = duracion.days();
      const horas = duracion.hours();
      const minutos = duracion.minutes();
      setTiempoRestante({
        meses,
        dias,
        horas,
        minutos
      })
    }
  }, [timer])

  return { tiempoRestante }
}
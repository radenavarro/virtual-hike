import { useEffect, useMemo, useRef, useState } from "react"
import { useTimer } from "../useTimer";
import { usePathTimeLimit } from "./usePathTimeLimit";
import dayjs from "dayjs";
import { useTemplate } from "../useTemplate";
import { TemplateIndex } from "@/app/types";

type TiempoProps = {
  meses?: number;
  dias?: number;
  horas?: number;
  minutos?: number;
  mes?: number;
  dia?: number;
  hora?: number;
  minuto?: number;
}

export const usePathTimeRemaining = () => {
  const tiempoRestante = useRef<TiempoProps>({});

  const timer = useTimer(1, 5).seconds
  const {tiempoLimiteRuta} = usePathTimeLimit()
  const { template } = useTemplate<TemplateIndex>('tabs/index')

  useEffect(() => {
    if (tiempoLimiteRuta) {
      const now = dayjs().format('DD-MM-YYYY HH:mm')
      const diferencia = tiempoLimiteRuta.diff(dayjs(now, 'DD-MM-YYYY HH:mm'))
      const duracion = dayjs.duration(diferencia);
      const meses = duracion.months();
      const dias = duracion.days();
      const horas = duracion.hours();
      const minutos = duracion.minutes();

      const clavesFinales = {
        mes: meses > 1 ? template.stepCounter.dateNames.monthNamePlural.toLowerCase() : template.stepCounter.dateNames.monthName.toLowerCase(),
        dia: dias > 1 ? template.stepCounter.dateNames.dayNamePlural.toLowerCase() : template.stepCounter.dateNames.dayName.toLowerCase(),
        hora: horas > 1 ? template.stepCounter.dateNames.hourNamePlural.toLowerCase() : template.stepCounter.dateNames.hourName.toLowerCase(),
        minuto: minutos > 1 ? template.stepCounter.dateNames.minuteNamePlural.toLowerCase() : template.stepCounter.dateNames.minuteName.toLowerCase()
      }

      const tiempoPush = {
        [clavesFinales.mes]: meses,
        [clavesFinales.dia]: dias,
        [clavesFinales.hora]: horas,
        [clavesFinales.minuto]: minutos
      }
      if (JSON.stringify(tiempoRestante.current) !== JSON.stringify(tiempoPush)) {
        tiempoRestante.current = tiempoPush
      }
    }
  }, [timer])

  return ({ tiempoRestante: tiempoRestante.current })
}
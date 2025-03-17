import { useEffect } from "react";
import { useDay } from "../useDay";
import { useAppStore } from "@/zustand/useStore";
import { RESET } from "@/app/helpers/helpers";
import { Registro } from "@/app/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const useNewDayBehaviour = () => {
  const { registro, agregarAHistorico } = useAppStore();
  const historico = useAppStore().historico;
  const { day } = useDay();

  function agregarDiasSaltados(registro: Registro) {
    const ultimoRegistroEnStore = historico?.reduce((acc, curr) => 
      dayjs(acc.fecha).isValid() 
      && dayjs(curr.fecha).isValid() 
      && dayjs(acc.fecha)?.isAfter(curr.fecha) 
      ? acc : curr, {}
    );
    let _fecha = dayjs(ultimoRegistroEnStore.fecha, 'DD-MM-YYYY').add(1, 'day');

    const time = Date.now();
    while (dayjs(registro.fecha, 'DD-MM-YYYY')?.isAfter(_fecha) && ((Date.now() - time) < 5000)) {
      agregarAHistorico({ fecha: _fecha, pasos: 0, objetivo: registro.objetivo, ruta: registro.ruta });
      _fecha = _fecha.add(1, 'day');
    }
  }

  useEffect(() => {
    if (!day.isSame(registro.fecha, 'day')) {
      agregarDiasSaltados(registro)
      agregarAHistorico(registro);
      RESET.registro();
    }
  }, [day])
}
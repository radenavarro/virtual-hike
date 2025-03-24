import { useEffect } from "react";
import { useDay } from "../useDay";
import { useAppStore } from "@/zustand/useStore";
import { borrarViejosRegistros, RESET } from "@/app/helpers/helpers";
import { Registro } from "@/app/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const useNewDayBehaviour = () => {
  const { registro, agregarAHistorico } = useAppStore();
  const historico = useAppStore().historico;
  const { day } = useDay();

  /**
   * Si el / la usuario no ha entrado en la app durante uno o más días, se agregan los días que falten con valores por defecto
   */
  function agregarDiasSaltados() {
    const ultimoRegistroEnStore = historico?.reduce((acc, curr) => 
      dayjs(acc.fecha).isValid() 
      && dayjs(curr.fecha).isValid() 
      && (dayjs(acc.fecha)?.isAfter(curr.fecha) && acc.fecha) 
      ? acc : curr, {}
    );
    const nuevoRegistroPh: Registro = { fecha: dayjs(), pasos: 0, objetivo: ultimoRegistroEnStore.objetivo, ruta: ultimoRegistroEnStore.ruta };
    let _fecha = dayjs(ultimoRegistroEnStore.fecha).add(1, 'day');

    const time = Date.now();
    while (nuevoRegistroPh.fecha?.isAfter(_fecha) && ((Date.now() - time) < 5000)) {
      const registroEnStore = historico.find((h) => dayjs(h.fecha).isSame(_fecha, 'day'))
      if (!registroEnStore) agregarAHistorico({ fecha: _fecha, pasos: 0, objetivo: nuevoRegistroPh.objetivo, ruta: nuevoRegistroPh.ruta });
      _fecha = _fecha.add(1, 'day');
    }
  }

  useEffect(() => {
    if (!day.isSame(registro.fecha, 'day')) {
      agregarDiasSaltados()
      agregarAHistorico(registro);
      borrarViejosRegistros(2, 'month')
      RESET.registro();
    }
  }, [day])
}
import { useEffect } from "react";
import { useDay } from "../useDay";
import { useAppStore } from "@/zustand/useStore";
import { RESET } from "@/app/helpers/helpers";

export const useNewDayBehaviour = () => {
  const { registro, historico, agregarAHistorico } = useAppStore();
  const { day } = useDay();
  
  useEffect(() => {
    if (!day.isSame(registro.fecha, 'day')) {
      console.log("NEW DAY")
      console.log(historico)
      agregarAHistorico(registro);
      RESET.registro();
    }
  }, [day])
}
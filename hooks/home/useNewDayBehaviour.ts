import { useEffect } from "react";
import { useDay } from "../useDay";
import { useAppStore } from "@/zustand/useStore";
import { RESET } from "@/app/helpers/helpers";

export const useNewDayBehaviour = () => {
  const { registro, agregarAHistorico } = useAppStore();
  const { day } = useDay();

  useEffect(() => {
    if (!day.isSame(registro.fecha, 'day')) {
      agregarAHistorico(registro);
      RESET.registro();
    }
  }, [day])
}
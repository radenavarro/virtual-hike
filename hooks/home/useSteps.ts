import { SubscriptionError } from "@/errors/Error";
import { Pedometer } from "expo-sensors";
import { useEffect, useMemo, useState } from "react";
import { useDay } from "../useDay";
import dayjs from "dayjs";
import { useAppStore } from "@/zustand/useStore";
import { RESET } from "@/app/helpers/helpers";

export const useSteps = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const { day } = useDay();
  const { registro, setRegistro, historico, agregarAHistorico } = useAppStore();

  useEffect(() => {
    setRegistro({
      ...registro,
      pasos: ((registro.pasos || 0) + currentStepCount),
    })
  }, [currentStepCount])

  useEffect(() => {
    if (!day.isSame(registro.fecha, 'day')) {
      agregarAHistorico(registro);
      RESET.registro();
    }
  }, [day])

  // PODOMETRO
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    console.log('Pedometer available:', isAvailable);
    
    if (isAvailable) {
      console.log('Watching step count');
      return Pedometer.watchStepCount(result => {
        console.log('Current step count:', result.steps);
        setCurrentStepCount(result.steps);
      });
    }
  };
    
  useEffect(() => {
    const subscription = subscribe();
    return () => {
      try {
        // const { remove } = subscription?._j
        // remove && remove()
        subscription && subscription.remove();
      } catch (e) {
        throw new SubscriptionError("SubscriptionError: Could not unsuscribe from app.")
      }
    }
  }, []);

  console.log(registro)
  console.log(historico);

  return useMemo(() => ({ isPedometerAvailable, pastStepCount, currentStepCount: registro.pasos }), [isPedometerAvailable, pastStepCount, registro.pasos])
}
import { Pedometer } from "expo-sensors";
import { useEffect, useMemo, useState } from "react";

export const useSteps = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

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
    return () => subscription && subscription?.remove();
  }, []);

  return useMemo(() => ({ isPedometerAvailable, pastStepCount, currentStepCount }), [isPedometerAvailable, pastStepCount, currentStepCount])
}
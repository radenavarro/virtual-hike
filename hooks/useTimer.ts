import { useEffect, useState, useRef } from "react";

/**
 * 
 * @param timerDelay Delay entre actualizaciones, en SEGUNDOS
 * @param limit Si está seteado, se reinician los segundos al llegar a este valor
 * @returns 
 */
export const useTimer = (timerDelay: number = 1, limit: number = 1) => {
    const [seconds, setSeconds] = useState(1);
    const accumulatedSeconds = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds < limit ? prevSeconds + 1 : 1;
                accumulatedSeconds.current += 1;
                return newSeconds;
            });
        }, timerDelay * 1000);

        return () => clearInterval(interval);
    }, [limit]);
    
    return { seconds, accumulatedSeconds: accumulatedSeconds.current };
}
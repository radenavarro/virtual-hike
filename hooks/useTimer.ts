import { useEffect, useState, useRef } from "react";

export const useTimer = (limit: number = 1) => {
    const [seconds, setSeconds] = useState(1);
    const accumulatedSeconds = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds < limit ? prevSeconds + 1 : 1;
                accumulatedSeconds.current += 1;
                return newSeconds;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [limit]);
    
    return { seconds, accumulatedSeconds: accumulatedSeconds.current };
}
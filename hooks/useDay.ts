import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTimer } from "./useTimer"

export const useDay = (): { day: dayjs.Dayjs } => {
    const [day, setDay] = useState(dayjs())

    const {seconds} = useTimer(10, 5)

    useEffect(() => {
        if(!dayjs().isSame(day, 'day')) setDay(dayjs())
    }, [seconds])
    
    return { day }
}
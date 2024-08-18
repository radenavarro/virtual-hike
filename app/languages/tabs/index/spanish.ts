import { TemplateIndex } from "@/app/types";
import dayjs from "dayjs";

export const spanish:TemplateIndex = {
    stepCounter: {
        title: dayjs().format("DD-MM-YYYY"),
        stepCounterText: 'pasos',
        pastStepCounterText: 'Acumulados',
        pedometerDisabledText: 'Podómetro desactivado. Active los permisos para poder usar la app'
    }
}
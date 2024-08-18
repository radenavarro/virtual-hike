import { TemplateIndex } from "@/app/types";
import dayjs from "dayjs";

export const english:TemplateIndex = {
    stepCounter: {
        title: dayjs().format("YYYY-MM-DD"),
        stepCounterText: 'steps',
        pastStepCounterText: 'Accumulated',
        pedometerDisabledText: 'Pedometer disabled. Enable grants in order to use this app.'
    }
}
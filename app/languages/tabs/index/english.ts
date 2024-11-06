import { TemplateIndex } from "@/app/types";
import dayjs from "dayjs";

export const english:TemplateIndex = {
  stepCounter: {
    title: dayjs().format("YYYY-MM-DD"),
    stepCounterText: 'steps',
    pastStepCounterText: 'Accumulated',
    pedometerDisabledText: 'Pedometer disabled. Enable grants in order to use this app.',
    dateNames: {
      monthName: 'Month',
      monthNamePlural: 'Months',
      dayName: 'Day',
      dayNamePlural: 'Days',
      hourName: 'Hour',
      hourNamePlural: 'Hours',
      minuteName: 'Minute',
      minuteNamePlural: 'Minutes',
    },
    currentPathText: 'Current path',
    pathStartText: 'Started',
    progressText: 'Progress',
    splitText: 'Split',
    kmText: 'Km',
    remainingText: 'Left',
    todayText: 'Today',
  }
}
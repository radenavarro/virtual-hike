import { useEffect, useRef, useState } from "react"
import { useTimer } from "../useTimer"
import { useSteps } from "./useSteps"

export const usePace = () => {
  const { currentStepCount } = useSteps()
  const { seconds } = useTimer(1, 5)
  const prevSteps = useRef(currentStepCount)
  const stepsPerSecond = useRef(0)

  const [pace, setPace] = useState(0)

  useEffect(() => {
    const diff = currentStepCount - prevSteps.current
    stepsPerSecond.current = diff <= 0 ? 0 : diff
    prevSteps.current = currentStepCount
  }, [seconds])

  // useEffect(() => {
  //   calculatePace()
  // }, [currentStepCount, seconds])

  // function calculatePace () {
  //   console.log()
  // }

  return { pace: stepsPerSecond.current }
}
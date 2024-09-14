import { useAppStore } from "@/zustand/useStore"
import { UnidadObjetivo } from "../types"
import { CalculationError } from "@/errors/Error"

export function throttle (mainFunction: (...params:any[]) => void, delay: number) {
  let timerFlag: NodeJS.Timeout | null = null
  
  return (...args: any[]) => {
    if (timerFlag === null) {
      mainFunction(...args)
      timerFlag = setTimeout(() => {
        timerFlag = null
      }, delay)
    }
  }
}

/**
 * Conversión de pasos a kms y viceversa. Es una aproximación, no son valores exactos
 * 
 * @param value 
 * @param type La unidad que estás enviando. Por ejemplo, si envías pasos, la conversión se hará en kms
 * 
 */
export function objectiveConvert (value:number, type: UnidadObjetivo) {
  let resultValue = 0;
  const height = useAppStore.getState()?.datosUser?.altura
  if (!height) throw new CalculationError("CalculationError: La altura no ha sido configurada o es inválida")
  const stepLength = height * 0.414 / 100;// 0.414 es una constante, los valores más exactos serían 0.413 para mujeres y 0.415 para hombres pero aquí se usa un promedio

  if (type === "pasos") {
    resultValue = (value * stepLength) / 1000;
  }
  if (type === "kms") {
    resultValue = Math.round((value * 1000) / stepLength);
  }

  if (isNaN(resultValue)) 
    throw new CalculationError("CalculationError: La conversión de unidades objetivo no ha sido correcta, el resultado no es numérico")

  return resultValue
}
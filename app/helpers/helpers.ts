import { useAppStore } from "@/zustand/useStore"
import { GraphicObject, GraphicsDirectory, Split, UnidadObjetivo } from "../types"
import { CalculationError } from "@/errors/Error"
import dayjs from "dayjs"
import { Sprites } from "@/constants/images"

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
export function objectiveConvert (value:number, type: UnidadObjetivo):number {
  let resultValue = 0;
  const height = useAppStore.getState()?.datosUser?.altura
  if (!height) throw new CalculationError("CalculationError: La altura no ha sido configurada o es inválida")
  const stepLength = height * 0.414 / 100;// 0.414 es una constante, los valores más exactos serían 0.413 para mujeres y 0.415 para hombres pero aquí se usa un promedio

  if (type === "pasos") {
    resultValue = parseFloat((value * stepLength / 1000).toFixed(2));
  }
  if (type === "kms") {
    resultValue = Math.round((value * 1000) / stepLength);
  }

  if (isNaN(resultValue)) 
    throw new CalculationError("CalculationError: La conversión de unidades objetivo no ha sido correcta, el resultado no es numérico")

  return resultValue;
}

export function isBetween (value: number, min: number, max: number, includeBoundaries: boolean = true) {
  return includeBoundaries ? value >= min && value <= max : value > min && value < max
}

export function getAllOverlappingsInSplits(splits:Split[]) {
  let overlappings:Split[] = [];

  for (let i = 0; i < splits.length; i++) {
    for (let j = i + 1; j < splits.length; j++) {
      const a = splits[i];
      const b = splits[j];

      if (
        (a.km < b.km + b.duracion && a.km + a.duracion > b.km)
        || (b.km < a.km + a.duracion && b.km + b.duracion > a.km)
      ) {
        overlappings = [...overlappings, a, b];
      }
    }
  }

  return [...new Set(overlappings)];
}

/**
 * Elimina registros viejos del histórico en el store de Zustand, acorde a los argumentos recibidos
 * @param cantidad 
 * @param unidad 
 */
export function borrarViejosRegistros(cantidad: number = 2, unidad: 'day' | 'month' | 'year' = 'month') {
  const historico = useAppStore.getState().historico
  const setHistorico = useAppStore.getState().setHistorico
  const fecha = dayjs()
  const nuevoHistorico = historico.filter(h => dayjs(h.fecha).isAfter(fecha.subtract(cantidad, unidad)))
  setHistorico(nuevoHistorico)
}

export const GRAPHICS = (() => {
  return {
    getFrom: (directories: GraphicsDirectory[]) => {
      let graphics: {[key in GraphicsDirectory]?: Split["sprites"]} = {}
      
      directories.forEach(directory => {  
        const spriteResource: Split["sprites"] = Sprites[directory]
        graphics[directory] = {
          skybox: spriteResource ? spriteResource.skybox : undefined,
          background: spriteResource ? spriteResource.background : undefined,
          ground: spriteResource ? spriteResource.ground : undefined,
          overlay: spriteResource ? spriteResource.overlay : undefined,
        }
      })
      return graphics
    }
  }
})()

export const RESET = (() => {
  const objetivo = useAppStore.getState().objetivo || {diario: 0, ruta: 0}
  const rutaActual = useAppStore.getState().selectedRuta || undefined
  return {
    registro: () => useAppStore.getState().setRegistro({ fecha: dayjs(), pasos: 0, objetivo, ruta: rutaActual }),
    historico: () => useAppStore.getState().setHistorico([]),
  }
})()
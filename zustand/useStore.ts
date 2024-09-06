import { Idioma } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type Registro = {
    fecha?: dayjs.Dayjs;
    pasos?: number;
}

type DatosUser = {
  altura?: number
}

type Objetivo = {
  diario?: number;
  largoPlazo?: number;
}

type UseStoreProps = {
  registro: Registro;
  setRegistro: (registro: Registro) => void
  historico: Registro[];
  agregarAHistorico?: (nuevoRegistro:Registro) => void;
  idioma: Idioma;
  setIdioma: (lang:Idioma) => void;
  datosUser: DatosUser;
  setDatosUser: (datosUser: DatosUser) => void;
  objetivo: Objetivo;
  setObjetivo: (nuevoObjetivo: Objetivo) => void;
}

export const useAppStore = create<UseStoreProps>()(
    devtools(
      persist(
        (set) => ({
          registro: {
            fecha: dayjs(),
            pasos: 0
          },
          setRegistro: (registro) => set({ registro }),
          historico: [{
            fecha: dayjs(),
            pasos: 0
          }],
          agregarAHistorico: (nuevoRegistro) => set((state) => ({ historico: [...state.historico, nuevoRegistro] })),
          idioma: 'Español',
          setIdioma: (idioma:Idioma) => set({idioma}),
          datosUser: {
            altura: undefined
          },
          setDatosUser: (datosUser) => set({ datosUser }),
          objetivo: {
            diario: undefined,
            largoPlazo: undefined
          },
          setObjetivo: (objetivo) => set({ objetivo }),
        }),
        {
          name: 'appstore',
          storage: createJSONStorage(() => AsyncStorage)
        }
      ),
      { name: 'appstore' }
    )
  )
import { DatosUser, Idioma, Objetivo, Registro, Ruta } from '@/app/types';
import { rutasDefault } from '@/constants/rutasDefault';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import uuid from "react-native-uuid"

type UseStoreProps = {
  registro: Registro;
  setRegistro: (registro: Registro) => void;
  historico: Registro[];
  setHistorico: (historico: Registro[]) => void;
  agregarAHistorico: (nuevoRegistro:Registro) => void;
  idioma: Idioma;
  setIdioma: (lang:Idioma) => void;
  datosUser: DatosUser;
  setDatosUser: (datosUser: DatosUser) => void;
  objetivo: Objetivo;
  setObjetivo: (nuevoObjetivo: Objetivo) => void;
  ruta: Ruta[];
  addRuta: (nuevaRuta: Ruta) => void;
  deleteRuta: (uuid: string) => void;
  updateRuta: (updated: Ruta) => void;
}

export const useAppStore = create<UseStoreProps>()(
    devtools(
      persist(
        (set) => ({
          // PASOS A MOSTRAR EN EL VISOR DE HOME Y EN EL HISTÓRICO DE PASOS POR DÍA
          registro: {
            fecha: dayjs(),
            pasos: 0
          },
          setRegistro: (registro) => set({ registro }),
          historico: [],
          setHistorico: (historico) => set({ historico }),
          agregarAHistorico: (nuevoRegistro) => set((state) => ({ historico: [...state.historico, nuevoRegistro] })),
          // MULTIIDIOMA
          idioma: 'Español',
          setIdioma: (idioma:Idioma) => set({idioma}),
          // CONFIGURACIÓN DE USUARIO
          datosUser: {
            altura: undefined
          },
          setDatosUser: (datosUser) => set({ datosUser }),
          objetivo: {
            diario: undefined,
            ruta: undefined
          },
          setObjetivo: (objetivo) => set({ objetivo }),
          ruta: rutasDefault,
          addRuta: (ruta) => set((state) => {
            const newUuid = uuid.v4().toString()
            return {ruta: [...state.ruta, {...ruta, uuid: newUuid}]}
          }),
          deleteRuta: (uuid) => set((state) => ({ ruta: state.ruta.filter(ruta => ruta.uuid !== uuid) })),
          updateRuta: (updated) => set((state) => {
            const { uuid } = updated
            const index = state.ruta.findIndex(ruta => ruta.uuid === uuid)
            const updatedState = {...state}
            updatedState.ruta[index] = updated
            return updatedState
          })
        }),
        {
          name: 'appstore',
          storage: createJSONStorage(() => AsyncStorage)
        }
      ),
      { name: 'appstore' }
    )
  )
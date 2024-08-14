import { Idioma } from '@/app/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type Registro = {
    fecha?: dayjs.Dayjs;
    pasos?: number;
}
type UseStoreProps = {
    registros?: Registro[];
    addRegistro?: (nuevoRegistro:Registro) => void;
    idioma: Idioma;
    setIdioma: (lang:Idioma) => void;
}

export const useAppStore = create<UseStoreProps>()(
    devtools(
      persist(
        (set) => ({
          registros: [{
            fecha: dayjs(),
            pasos: 0
          }],
          addRegistro: (nuevoRegistro) => set(() => {
            
          }),
          idioma: 'Español',
          setIdioma: (idioma:Idioma) => set({idioma})
        }),
        {
          name: 'store',
          storage: createJSONStorage(() => AsyncStorage)
        }
      ),
      { name: 'store' }
    )
  )
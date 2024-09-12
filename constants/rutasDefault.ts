import { Ruta } from "@/app/types"
import uuid from "react-native-uuid"

export const rutasDefault = (Object.freeze(() => (
  [{
    uuid : uuid.v4().toString(),
    nombre : "Parque La Granja - Plaza del Ayuntamiento (Valencia)",
    duracion : 5.8,
    splits: [
      {
        nombre: "Burjassot",
        km: 0,
        duracion: 1,
      },
      {
        nombre: "Empalme",
        km: 1,
        duracion: 0.5,
      },
      {
        nombre: "Palacio de congresos",
        km: 1.5,
        duracion: 0.5,
      },
      {
        nombre: "Benicalap",
        km: 2,
        duracion: 1
      },
      {
        nombre: "El Calvari",
        km: 3,
        duracion: 0.5
      },
      {
        nombre: "Les Tendetes",
        km: 3.5,
        duracion: 0.5
      },
      {
        nombre: "Pont de les Arts",
        km: 4,
        duracion: 0.2
      },
      {
        nombre: "Calle Na Jornada",
        km: 4.2,
        duracion: 0.3
      },
      {
        nombre: "Calle Alta",
        km: 4.5,
        duracion: 0.3
      },
      {
        nombre: "Calle de la Bolsería",
        km: 4.8,
        duracion: 0.2
      },
      {
        nombre: "Mercado central",
        km: 5,
        duracion: 0.4
      },
      {
        nombre: "Plaza del Ayuntamiento",
        km: 5.4,
        duracion: 0.4
      }
    ]
  }]
)))()
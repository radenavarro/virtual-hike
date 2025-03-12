import { Ruta } from "@/app/types"
import uuid from "react-native-uuid"
import { Sprites } from "./images"
import { duration } from "dayjs"
import { athensMarathon } from "./hikePaths/athensMarathon/athensMarathon"
import { frodosPath } from "./hikePaths/frodosPath/frodosPath"

export const rutasDefault = (Object.freeze(() => (
  [
    {
      uuid : uuid.v4().toString(),
      nombre : "Parque La Granja - Plaza del Ayuntamiento (Valencia)",
      duracion : 5.8,
      splits: [
        {
          nombre: "Burjassot",
          km: 0,
          duracion: 1,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Empalme",
          km: 1,
          duracion: 0.5,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Palacio de congresos",
          km: 1.5,
          duracion: 0.5,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Benicalap",
          km: 2,
          duracion: 1,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "El Calvari",
          km: 3,
          duracion: 0.5,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Les Tendetes",
          km: 3.5,
          duracion: 0.5,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Pont de les Arts",
          km: 4,
          duracion: 0.2,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Calle Na Jornada",
          km: 4.2,
          duracion: 0.3,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Calle Alta",
          km: 4.5,
          duracion: 0.3,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Calle de la Bolsería",
          km: 4.8,
          duracion: 0.2,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Mercado central",
          km: 5,
          duracion: 0.4,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        },
        {
          nombre: "Plaza del Ayuntamiento",
          km: 5.4,
          duracion: 0.4,
          sprites: {
            skybox: Sprites.grass?.skybox,
            ground: Sprites.grass?.ground,
            overlay: Sprites.grass?.overlay
          }
        }
      ]
    },
    {
      ...athensMarathon
    },
    {
      ...frodosPath
    }
  ]
)))()
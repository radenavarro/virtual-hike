import uuid from "react-native-uuid"
import { Sprites } from "@/constants/images"
import { DefaultPathTemplate, Ruta } from "@/app/types"
import { useTemplate } from "@/hooks/useTemplate"

export const athensMarathon = () => {
  const athensMarathonTemplate: DefaultPathTemplate = useTemplate<DefaultPathTemplate>("constants/defaultPaths/athensMarathon").template
  const athensMarathonPath: Ruta = {
    uuid: uuid.v4().toString(),
    // nombre: "Maratón de Atenas",
    nombre: athensMarathonTemplate.nombre,
    duracion: 42.195,
    dias: 0.17,// 4 horas
    splits: [
      {
        // "Marathon"
        nombre: athensMarathonTemplate.splits[0],
        km: 0,
        duracion: 4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Marathonomachon"
        nombre: athensMarathonTemplate.splits[1],
        km: 4,
        duracion: 2.2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Nea Makri"
        nombre: athensMarathonTemplate.splits[2],
        km: 6.2,
        duracion: 4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Ruta hacia Pikermi"
        nombre: athensMarathonTemplate.splits[3],
        km: 10.2,
        duracion: 8,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Pikermi"
        nombre: athensMarathonTemplate.splits[4],
        km: 18.2,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Ruta hacia Agia Paraskevi"
        nombre: athensMarathonTemplate.splits[5],
        km: 20.2,
        duracion: 9,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Agia Paraskevi"
        nombre: athensMarathonTemplate.splits[6],
        km: 29.2,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Ruta hacia Atenas"
        nombre: athensMarathonTemplate.splits[7],
        km: 31.2,
        duracion: 5,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // "Atenas"
        nombre: athensMarathonTemplate.splits[8],
        km: 36.2,
        duracion: 5.995,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      }
    ]
  }
  return athensMarathonPath
}
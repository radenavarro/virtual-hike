import uuid from "react-native-uuid"
import { Sprites } from "@/constants/images"
import { DefaultPathTemplate, Ruta } from "@/app/types"
import { useTemplate } from "@/hooks/useTemplate"

export const dragonbornPathOne = () => {
  const dragonbornPathTwoTemplate: DefaultPathTemplate = useTemplate<DefaultPathTemplate>("constants/defaultPaths/athensMarathon").template
  const dragonbornPathTwoPath: Ruta = {
    uuid: uuid.v4().toString(),
    // nombre: "Ruta del Sangre de Dragón 2",
    nombre: dragonbornPathTwoTemplate.nombre,
    duracion: 35,
    dias: 0.33,// 8 horas
    splits: [
      {
        nombre: dragonbornPathTwoTemplate.splits[0],
        km: 0,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[1],
        km: 1,
        duracion: 8,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[2],
        km: 9,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[3],
        km: 10,
        duracion: 14,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay,
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[4],
        km: 24,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[5],
        km: 25,
        duracion: 17,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay,
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[6],
        km: 42,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[7],
        km: 43,
        duracion: 6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay,
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[8],
        km: 49,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[9],
        km: 50,
        duracion: 4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        nombre: dragonbornPathTwoTemplate.splits[10],
        km: 54,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      }
    ]
  }
  return dragonbornPathTwoPath
}
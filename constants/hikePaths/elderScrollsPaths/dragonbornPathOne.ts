import uuid from "react-native-uuid"
import { Sprites } from "@/constants/images"
import { DefaultPathTemplate, Ruta } from "@/app/types"
import { useTemplate } from "@/hooks/useTemplate"

export const dragonbornPathOne = () => {
  const dragonbornPathOneTemplate: DefaultPathTemplate = useTemplate<DefaultPathTemplate>("constants/defaultPaths/athensMarathon").template
  const dragonbornPathOnePath: Ruta = {
    uuid: uuid.v4().toString(),
    // nombre: "Ruta del Sangre de Dragón",
    nombre: dragonbornPathOneTemplate.nombre,
    duracion: 35,
    dias: 0.33,// 8 horas
    splits: [
      {
        // Nombre: "Helgen"
        nombre: dragonbornPathOneTemplate.splits[0],
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
        // Nombre: "Road to Riverwood"
        nombre: dragonbornPathOneTemplate.splits[1],
        km: 1,
        duracion: 4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // Nombre: "Riverwood"
        nombre: dragonbornPathOneTemplate.splits[2],
        km: 5,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        // Nombre: "Road to Whiterun"
        nombre: dragonbornPathOneTemplate.splits[3],
        km: 6,
        duracion: 6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // Nombre: "Whiterun"
        nombre: dragonbornPathOneTemplate.splits[4],
        km: 12,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        // Nombre: "Road to Ivarstead"
        nombre: dragonbornPathOneTemplate.splits[5],
        km: 13,
        duracion: 14,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // Nombre: "Ivarstead"
        nombre: dragonbornPathOneTemplate.splits[6],
        km: 27,
        duracion: 1,
        sprites: {
          skybox: Sprites.town?.skybox,
          background: Sprites.town?.background,
          ground: Sprites.town?.ground,
          overlay: Sprites.town?.overlay
        }
      },
      {
        // Nombre: "Seven Thousand Steps"
        nombre: dragonbornPathOneTemplate.splits[7],
        km: 28,
        duracion: 6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // Nombre: "High Hrothgar"
        nombre: dragonbornPathOneTemplate.splits[8],
        km: 34,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      }
    ]
  }
  return dragonbornPathOnePath
}
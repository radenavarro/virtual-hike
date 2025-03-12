import uuid from "react-native-uuid"
import { Sprites } from "@/constants/images"
import { DefaultPathTemplate, Ruta } from "@/app/types"
import { useTemplate } from "@/hooks/useTemplate"

export const frodosPath = () => {
  const frodosPathTemplate: DefaultPathTemplate = useTemplate<DefaultPathTemplate>("constants/defaultPaths/frodosPath").template
  const frodosPathLang: Ruta = {
    uuid : uuid.v4().toString(),
    nombre: frodosPathTemplate.nombre,
    duracion: 1980,
    dias: 180,
    splits: [
      {
        // nombre: "Bolsón cerrado",
        nombre: frodosPathTemplate.splits[0],
        km: 0,
        duracion: 1.6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Delagua",
        nombre: frodosPathTemplate.splits[1],
        km: 1.6,
        duracion: 1.9,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Camino hacia el Puente de Brandivino",
        nombre: frodosPathTemplate.splits[2],
        km: 3.5,
        duracion: 19,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Puente de Brandivino",
        nombre: frodosPathTemplate.splits[3],
        km: 65,
        duracion: 0.6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Bosque Viejo",
        nombre: frodosPathTemplate.splits[4],
        km: 75,
        duracion: 15,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Casa de Tom Bombadil",
        nombre: frodosPathTemplate.splits[5],
        km: 90,
        duracion: 0.6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Bosque Viejo",
        nombre: frodosPathTemplate.splits[6],
        km: 90.6,
        duracion: 10,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Quebradas de los Túmulos",
        nombre: frodosPathTemplate.splits[7],
        km: 105,
        duracion: 15,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Bree",
        nombre: frodosPathTemplate.splits[8],
        km: 140,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Amon Sûl",
        nombre: frodosPathTemplate.splits[9],
        km: 307,
        duracion: 15,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Puente de Mitheithel",
        nombre: frodosPathTemplate.splits[10],
        km: 465,
        duracion: 0.4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Bosque de los Trolls",
        nombre: frodosPathTemplate.splits[11],
        km: 475.4,
        duracion: 109.6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Claro de los Trolls",
        nombre: frodosPathTemplate.splits[12],
        km: 585,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Bosque de los Trolls",
        nombre: frodosPathTemplate.splits[13],
        km: 586,
        duracion: 47,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Vado de Bruinen",
        nombre: frodosPathTemplate.splits[14],
        km: 633,
        duracion: 2.4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Rivendel",
        nombre: frodosPathTemplate.splits[15],
        km: 715,
        duracion: 1.8,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Paso de Caradhras",
        nombre: frodosPathTemplate.splits[16],
        km: 1095,
        duracion: 80,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Puertas de Moria",
        nombre: frodosPathTemplate.splits[17],
        km: 1175,
        duracion: 0.4,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Minas de Moria",
        nombre: frodosPathTemplate.splits[18],
        km: 1175.4,
        duracion: 35,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Puente de Khazad-dûm",
        nombre: frodosPathTemplate.splits[19],
        km: 1210.4,
        duracion: 5,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Puerta oeste de Khazad-dûm",
        nombre: frodosPathTemplate.splits[20],
        km: 1215.4,
        duracion: 0.6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Lago Espejo",
        nombre: frodosPathTemplate.splits[21],
        km: 1216,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Cauce de Plata",
        nombre: frodosPathTemplate.splits[22],
        km: 1234,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Lothlórien",
        nombre: frodosPathTemplate.splits[23],
        km: 1260,
        duracion: 17,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Caras Galadhon",
        nombre: frodosPathTemplate.splits[24],
        km: 1277,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Lothlórien oriental",
        nombre: frodosPathTemplate.splits[25],
        km: 1278,
        duracion: 6,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Río Anduin",
        nombre: frodosPathTemplate.splits[26],
        km: 1284,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Cataratas de Rauros",
        nombre: frodosPathTemplate.splits[27],
        km: 1285,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Emyn Muil",
        nombre: frodosPathTemplate.splits[28],
        km: 1287,
        duracion: 180,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Ciénaga de los Muertos",
        nombre: frodosPathTemplate.splits[29],
        km: 1467,
        duracion: 136,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "La Puerta Negra",
        nombre: frodosPathTemplate.splits[30],
        km: 1603,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Norte de Ithilien",
        nombre: frodosPathTemplate.splits[31],
        km: 1604,
        duracion: 180,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Osgiliath",
        nombre: frodosPathTemplate.splits[32],
        km: 1784,
        duracion: 2,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Norte de Ithilien",
        nombre: frodosPathTemplate.splits[33],
        km: 1786,
        duracion: 50,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Minas Morgul",
        nombre: frodosPathTemplate.splits[34],
        km: 1836,
        duracion: 25,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Antro de Ella Laraña",
        nombre: frodosPathTemplate.splits[35],
        km: 1861,
        duracion: 10,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Cirith Ungol",
        nombre: frodosPathTemplate.splits[36],
        km: 1871,
        duracion: 1,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Meseta de Gorgoroth",
        nombre: frodosPathTemplate.splits[37],
        km: 1872,
        duracion: 64,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      },
      {
        // nombre: "Monte del Destino",
        nombre: frodosPathTemplate.splits[38],
        km: 1936,
        duracion: 44,
        sprites: {
          skybox: Sprites.grass?.skybox,
          background: Sprites.grass?.background,
          ground: Sprites.grass?.ground,
          overlay: Sprites.grass?.overlay
        }
      }
    ]
  }
  return frodosPathLang
}
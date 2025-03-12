// LAYOUT IMPORTS
import { english as languageEnglish } from "@/app/languages/tabs/language/english"
import { spanish as languageSpanish } from "@/app/languages/tabs/language/spanish"
import { english as layoutEnglish } from "@/app/languages/tabs/layout/english"
import { spanish as layoutSpanish } from "@/app/languages/tabs/layout/spanish"
import { english as indexEnglish } from "@/app/languages/tabs/index/english"
import { spanish as indexSpanish } from "@/app/languages/tabs/index/spanish"
import { spanish as modalRutaSpanish } from "@/app/languages/tabs/config/modalRuta/spanish"
import { english as modalRutaEnglish } from "@/app/languages/tabs/config/modalRuta/english"
import { spanish as configSpanish } from "@/app/languages/tabs/config/spanish"
import { english as configEnglish } from "@/app/languages/tabs/config/english"
import { spanish as pathsSpanish } from "@/app/languages/tabs/paths/spanish"
import { english as pathsEnglish } from "@/app/languages/tabs/paths/english"
// DEFAULT PATH IMPORTS
import { english as athensMarathonEnglish } from "@/app/languages/constants/defaultPaths/athensMarathon/english"
import { spanish as athensMarathonSpanish } from "@/app/languages/constants/defaultPaths/athensMarathon/spanish"
import { english as frodosPathEnglish } from "@/app/languages/constants/defaultPaths/frodosPath/english"
import { spanish as frodosPathSpanish } from "@/app/languages/constants/defaultPaths/frodosPath/spanish"
import { english as dragonbornPathOneEnglish } from "@/app/languages/constants/defaultPaths/elderScrollsPaths/dragonbornPathOne/english"
import { spanish as dragonbornPathOneSpanish } from "@/app/languages/constants/defaultPaths/elderScrollsPaths/dragonbornPathOne/spanish"

export const fullAppTemplate = {
  tabs: {
    language: {
      spanish: languageSpanish,
      english: languageEnglish
    },
    layout: {
      spanish: layoutSpanish,
      english: layoutEnglish
    },
    index: {
      spanish: indexSpanish,
      english: indexEnglish
    },
    config: {
      spanish: configSpanish,
      english: configEnglish,
      modalRuta: {
        spanish: modalRutaSpanish,
        english: modalRutaEnglish
      }
    },
    paths: {
      spanish: pathsSpanish,
      english: pathsEnglish
    }
  },
  constants: {
    defaultPaths: {
      athensMarathon: {
        spanish: athensMarathonSpanish,
        english: athensMarathonEnglish
      },
      frodosPath: {
        spanish: frodosPathSpanish,
        english: frodosPathEnglish
      },
      elderScrollsPaths: {
        dragonbornPathOne: {
          spanish: dragonbornPathOneSpanish,
          english: dragonbornPathOneEnglish
        }
      }
    }
  }
}
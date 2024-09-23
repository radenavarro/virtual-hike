import { english as languageEnglish } from "@/app/languages/tabs/language/english"
import { spanish as languageSpanish } from "@/app/languages/tabs/language/spanish"
import { english as layoutEnglish } from "@/app/languages/tabs/layout/english"
import { spanish as layoutSpanish } from "@/app/languages/tabs/layout/spanish"
import { english as indexEnglish } from "@/app/languages/tabs/index/english"
import { spanish as indexSpanish } from "@/app/languages/tabs/index/spanish"
import { spanish as modalRutaSpanish } from "./languages/tabs/config/modalRuta/spanish"
import { english as modalRutaEnglish } from "./languages/tabs/config/modalRuta/english"

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
        modalRuta: {
          spanish: modalRutaSpanish,
          english: modalRutaEnglish
        }
      }
    }
  }
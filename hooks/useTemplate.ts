import { english as languageEnglish } from "@/app/languages/tabs/language/english"
import { spanish as languageSpanish } from "@/app/languages/tabs/language/spanish"
import { english as layoutEnglish } from "@/app/languages/tabs/layout/english"
import { spanish as layoutSpanish } from "@/app/languages/tabs/layout/spanish"
import { Template, TemplateIdioma, TemplateTabLayout } from "@/app/types"
import { useAppStore } from "@/zustand/useStore"
import { useEffect, useState } from "react"

const fullAppTemplate = {
  tabs: {
    language: {
      spanish: languageSpanish,
      english: languageEnglish
    },
    layout: {
      spanish: layoutSpanish,
      english: layoutEnglish
    }
  }
}

type TemplatePath = typeof fullAppTemplate | 
  typeof fullAppTemplate["tabs"] | 
  typeof fullAppTemplate["tabs"]["language"] | 
  typeof fullAppTemplate["tabs"]["layout"]

const emptyTemplate:Template = {
  header: '',
  subheader: ''
}
/**
 * 
 * @param path - Ruta tomando de punto de partida @app/languages/
 */
export const useTemplate = (path:string) => {
  const {idioma} = useAppStore()

  const [template, setTemplate] = useState<Template>(emptyTemplate)

  useEffect(() => {
    if (idioma) manejarIdioma()
  },[idioma])

  async function manejarIdioma () {
    const lang = 
      idioma === 'English' ? idioma.toLowerCase() :
      idioma === 'Español' ? 'spanish' : undefined

      const pathDirectories = path.split('/')

    try {
      const newTemplate = pathDirectories.reduce((prev:TemplatePath, current:string) => {
        if (typeof current === "string") {
          return prev[current]
        } else {
          return prev
        }
      }, fullAppTemplate)?.[lang]
        
      if (newTemplate) {
        setTemplate(newTemplate)
      }
    } catch (e) {
      console.error(e)
    }
    
  }
  return {template}
}
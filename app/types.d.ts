export type Idioma = 'Español' | 'English'

export interface Template {}
export interface TemplateIdioma extends Template {
    header: string,
    subheader: string
}

export interface TemplateTabLayout extends Template {
    homeText: string,
    configText: string,
    languageText: string
}

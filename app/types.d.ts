import { Theme } from "@react-navigation/native"

export type Idioma = 'Español' | 'English'

export interface Template {
    header?: string;
    subheader?: string;
    homeText?: string;
    configText?: string;
    languageText?: string;
}
export interface TemplateIdioma extends Template {
    header: string;
    subheader: string;
}

export interface TemplateTabLayout extends Template {
    homeText: string;
    configText: string;
    languageText: string;
}

type CustomColors = {
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
}

export type CustomTheme = Theme & {colors: Theme["colors"] & CustomColors}
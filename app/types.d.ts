import { Theme } from "@react-navigation/native"

export type Idioma = 'Español' | 'English'

type CustomColors = {
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    stepCounter: {
        border: string;
        background: string;
    }
}

export type CustomTheme = Theme & {colors: Theme["colors"] & CustomColors}

// TEMPLATES IDIOMA

export interface Template {
    header?: string;
    subheader?: string;
    homeText?: string;
    configText?: string;
    languageText?: string;
    stepCounter?: {
        title?: string;
        stepCounterText?: string;
        pastStepCounterText?: string;
    }
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

export interface TemplateIndex extends Template {
    stepCounter: {
        title: string;
        stepCounterText: string;
        pastStepCounterText: string;
    }
}
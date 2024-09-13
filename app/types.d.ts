import { Theme } from "@react-navigation/native"

export type Idioma = 'Español' | 'English'

type Color = {
    color: string;
    disabledColor?: string;
    text: string;
    disabledText?: string;
}
type CustomColors = {
    button: {
        primary: Color;
        danger: Color;
        default: Color;
    };
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    stepCounter: {
        border: string;
        background: string;
    };
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
        pedometerDisabledText?: string;
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
        pedometerDisabledText: string;
    }
}

// STORE

export type Registro = {
    fecha?: dayjs.Dayjs;
    pasos?: number;
}

export type DatosUser = {
  altura?: number
}

export type Objetivo = {
  diario?: number;
  ruta?: number;
}

export type Split = {
  nombre: string;
  km: number;
  duracion: number;
  sprites?: {
    skybox: string;
    ground: string;
    overlay: string;
  }
}

export type Ruta = {
  uuid: string;
  nombre: string;
  duracion: number;// KMs
  splits?: Split[];
}

// CONFIG

export type UnidadObjetivo = 'pasos' | 'kms'
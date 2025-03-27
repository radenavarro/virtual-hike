import { Theme } from "@react-navigation/native"
import { ImageSourcePropType } from "react-native";

export type Idioma = 'Español' | 'English'

type Alias = {[key in GraphicsDirectory]: string}

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
        warning: Color;
        success: Color;
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
    newSplitBg?: string;
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
    pathsText: string;
    configText: string;
    languageText: string;
}

export interface TemplateIndex extends Template {
  stepCounter: {
    title: string;
    stepCounterText: string;
    pastStepCounterText: string;
    pedometerDisabledText: string;
    dateNames: {
      monthName: string;
      monthNamePlural: string;
      dayName: string;
      dayNamePlural: string;
      hourName: string;
      hourNamePlural: string;
      minuteName: string;
      minuteNamePlural: string;
    },
    currentPathText: string;
    pathStartText: string;
    progressText: string;
    splitText: string;
    kmText: string;
    remainingText: string;
    todayText: string;
  }
}

export interface TemplateConfig extends Template {
  header: string;
  heightDescription: string;
  heightText: string;
  objectiveDescription: string;
  objectiveText: string;
  pathDescription: string;
  pathText: string;
}

export interface TemplateModalRuta extends Template {
  currentPathText: string;
  loadPathText: string;
  pathNameText: string;
  daysToCompleteText: string;
  split: {
    splitsText: string;
    nameText: string;
    namePhText: string;
    startsInKmText: string;
    startsInKmPhText: string;
    durationKmsText: string;
    durationKmsPhText: string;
    addSplit: string;
    editSplit: string;
    removeSplit: string;
    graphics: {
      nameText: string;
      skyboxText: string;
      backgroundText: string;
      middleText: string;
      foregroundText: string;
      alias: Alias;
    }
  };
  validationMessages: {
    rutaAdded: string;
    rutaEdited: string;
    splitAdded: string;
    splitEdited: string;
    splitRemoved: string;
    spriteChanged: string;
  };
  validationErrorMessages: {
    splitErrorTitle: string;
    noName: string;
    noKm: string;
    noDuration: string;
    kmBelowZero: string;
    durationZeroOrLess: string;
    nameEmpty: string;
    nameInSplits: string;
    kmInSplits: string;
    overlappingSplits: string;
  };
}

export interface TemplatePaths extends Template {
  descriptionP1Text: string;
  descriptionP2Text: string;
  pathSelectText: string;
  viewHistoryText?: string;
}

/**
 * Tipo usado para las plantillas de rutas predeterminadas en @/constants/hikePaths
 */
export interface DefaultPathTemplate extends Template {
  nombre: string;
  splits: string[];
}

// STORE

export type Registro = {
  fecha?: dayjs.Dayjs;
  pasos?: number;
  objetivo?: Objetivo;
  ruta?: string;
  puntuacion?: number;
}

export type DatosUser = {
  altura?: number
}

export type Objetivo = {
  diario?: number;
  ruta?: number;
}

export type SpriteType = {
  skybox?: ImageSourcePropType;
  background?: ImageSourcePropType;
  ground?: ImageSourcePropType;
  overlay?: ImageSourcePropType;
}

export type Split = {
  nombre: string;
  km: number;
  duracion: number;
  sprites?: SpriteType;
}

export type Ruta = {
  uuid: string;
  nombre: string | undefined;
  duracion?: number | undefined;// KMs
  dias?: number | undefined;
  splits?: Split[];
}

// CONFIG

export type UnidadObjetivo = 'pasos' | 'kms'

export type GraphicsDirectory = 'grass' | 'town' | 'wasteland' | 'cave' | 'lake' | 'forest' | 'marsh'

export type GraphicObject = {
    [key in GraphicsDirectory]: Split["sprites"]
}
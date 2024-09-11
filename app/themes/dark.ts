import { DarkTheme } from "@react-navigation/native"
import { CustomTheme } from "../types";

const tintColorDark = '#fff';
export const DarkThemeColors: CustomTheme = {
    "dark":true,
    "colors":{
        ...DarkTheme.colors,
        button: {
            primary: {
                color: "rgb(0, 122, 255)",
                text: "rgb(244, 244, 244)"
            },
            default: {
                color: "rgb(255 255 255 / 0.2)",
                text: "rgb(244, 244, 244)"
            }  
        },
        card:"rgb(68, 68, 68)",
        border:"rgb(96, 96, 96)",
        notification:"rgb(255, 59, 48)",
        text: '#ECEDEE',
        background: '#151718',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        stepCounter: {
            border: "rgb(125, 125, 125)",
            background: "rgb(100, 100, 100)"
        }
    }
}
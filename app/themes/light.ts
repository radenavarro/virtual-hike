import { DefaultTheme } from "@react-navigation/native"
import { CustomTheme } from "../types";

const tintColorLight = '#0a7ea4';
export const LightThemeColors: CustomTheme = {
    "dark":false,
    "colors":{
        ...DefaultTheme.colors,
        button: {
            primary: {
                color:"rgb(0, 122, 255)",
                text: "rgb(244, 244, 244)"
            },
            default: {
                color: "rgb(216, 216, 216)",
                text: "#11181C"
            }
        },
        card:"rgb(255, 255, 255)",
        border:"rgb(216, 216, 216)",
        notification:"rgb(255, 59, 48)",
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        stepCounter: {
            border: "rgb(216, 216, 216)",
            background: "rgb(233, 233, 233)"
        }
    }
}
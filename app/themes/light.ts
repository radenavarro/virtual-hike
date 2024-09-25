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
                disabledColor: "rgb(29, 80, 134)",
                text: "rgb(244, 244, 244)",
                disabledText: "rgb(152, 157, 177)"
            },
            danger: {
                color:"rgb(193, 2, 2)",
                disabledColor: "rgb(112, 16, 16)",
                text: "rgb(244, 244, 244)",
                disabledText: "rgb(189, 137, 137)"
            },
            warning: {
                color: "rgb(148, 139, 13)",
                disabledColor: "rgb(122, 114, 0)",
                text: "rgb(244, 244, 244)",
                disabledText: "rgb(189, 186, 137)"
            },
            success: {
                color: "rgb(13, 148, 15)",
                disabledColor: "rgb(14, 100, 1)",
                text: "rgb(244, 244, 244)",
                disabledText: "rgb(145, 189, 137)"
            },
            default: {
                color: "rgb(216, 216, 216)",
                disabledColor: "rgba(0, 0, 0, 0)",
                text: "#11181C",  
                disabledText: "rgb(90, 90, 90)",
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
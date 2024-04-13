// ----- Components -----
import { ViewStyle } from "react-native"
import GraphicsTypes from "./Graphic"
import FrecuencyTable from "./Model/FrequencyTable"
export type SChartPropsType = {
    data: Data,
    type?: keyof typeof GraphicsTypes,
    viewBox?: ViewBox,
    frecuencyTable?: FrecuencyTable,
    showLabel?: boolean,
    showValue?: boolean,
    strokeWidth?: number,
    colors?: string[],
    style?: ViewStyle
}


// ----- Models -----

export type DataObj = { [key: string]: number }
export type Data = { [key: string]: DataObj } | DataObj

export type ColorHex = `#${string}` | `transparent`

export type SvgStyle = {
    stroke?: ColorHex
    strokeWidth?: number
    fill?: ColorHex,
    opacity?: number

}
export type ViewBox = { width: number, height: number, x: number, y: number }






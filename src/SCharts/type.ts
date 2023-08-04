import { Options } from "."

type color = `#${string}` | "transparent"
export type SChartStyleType = {
    strokeWidth?: number,
    stroke?: color,
    fill?: color,
}

export type SChartConfig = {

    space?: number,
    grosor?: number,
    endSpace?: number,
    textColor?: string,
    fontSize?: number,
}
export type SChartsPropsType = {
    viewBox?: { width: number, height: number },
    type: keyof typeof Options,
    data: DataPropsType[],
    style?: SChartStyleType,
    config?: SChartConfig,
    onSelect?: (obj: DataPropsType) => any
}

export type OptionsType = {
    stroke?: any,
    strokeWidth?: any,
} & SChartsPropsType


export type DataValueType = { val: number }
// export type DataPropsType = { [key: string]: number }
export type DataPropsType = {
    key: string,
    val: number | DataValueType,
    style?: SChartStyleType,
    color?: any,
    label?: string,
    info?: any
}
import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export default ({ viewBox, frecuencyTable }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        <Path
            stroke={color_random()}
            fill={"transparent"}
            d={`M 0 0 L 100 100 L 10 20`}
        />
    </Svg>
}
import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export default ({ viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2 }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    const interval_width = width / (frecuencyTable.intervals.length)
    let space = 0.1 * interval_width;
    let max = frecuencyTable.max("relative_frequency")
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        let fx = f / max;
        x += interval_width;

        let label;
        if (showLabel) {
            label = (
                <Text
                    dx={x - (interval_width / 2)}
                    dy={y + height - 6}
                    textAnchor="middle"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_width - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={8}
                >{frecuencyTable.intervals[i]}</Text >
            )
        }

        let value;
        if (showValue) {
            value = (
                <Text
                    dx={x - (interval_width / 2)}
                    dy={y + height - ((fx) * height) + 12}
                    textAnchor="middle"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_width - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={10}
                >{(frecuencyTable.frequency_data[i]).toFixed(1)}</Text >
            )
        }

        return <>
            <Path
                key={"r" + i}
                strokeWidth={strokeWidth}
                stroke={frecuencyTable.intervals_color[i]}
                fill={"transparent"}
                d={[
                    "M", space / 2 + x - (interval_width - (strokeWidth / 2)), y + height,
                    "L", space / 2 + x - (interval_width - (strokeWidth / 2)), y + ((height) - ((fx) * height)),
                    "L", x - space / 2 - ((strokeWidth / 2)), y + ((height) - ((fx) * height)),
                    "L", x - space / 2 - ((strokeWidth / 2)), (height) + y, y,
                ].join(" ")}
            />
            {label}
            {value}
        </>

    })
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {Gra}
    </Svg>
}

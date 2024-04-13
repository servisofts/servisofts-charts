import React from "react"
import { Defs, G, LinearGradient, Path, Rect, Stop, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export default ({ viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2 }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    const interval_width = width / (frecuencyTable.intervals.length)
    let space = 0 * interval_width;

    let max = frecuencyTable.max("relative_frequency")
    const path = ["M", 0, height]
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        let fx = f / max;
        x += interval_width;
        path.push(...[
            "L",
            x - space / 2 - ((strokeWidth / 2)),
            y + ((height) - ((fx) * height))
        ])

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
                    dy={y + height - ((fx) * height) + 10}
                    textAnchor="middle"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_width - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={10}
                >{(frecuencyTable.frequency_data[i]).toFixed(1)}</Text >
            )
        }
        return <>
            {label}
            {value}
        </>

    })
    // path.push(...[
    //     "L",
    //     width,
    //     y + (height)
    // ])
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                {[frecuencyTable.intervals_color[0], ...frecuencyTable.intervals_color].map((a, i) => <Stop offset={i / frecuencyTable.intervals.length} stopColor={a} stopOpacity="1" />)}
            </LinearGradient>
        </Defs>
        {Gra}
        <Path
            key={"r"}
            strokeWidth={strokeWidth}
            // stroke={color_random()}
            stroke={"url(#grad)"}
            // fill={"url(#grad)"}
            fill={"transparent"}
            d={path.join(" ")}
        />
    </Svg>
}
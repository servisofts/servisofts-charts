import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export default ({ viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2 }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    const interval_height = height / (frecuencyTable.intervals.length)
    let space = 0.1 * interval_height;
    let max = frecuencyTable.max("relative_frequency")
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        let fy = f / max;
        y += interval_height;
        let label;
        if (showLabel) {
            label = (
                <Text
                    dx={x}
                    dy={space / 2 + y - ((interval_height / 2) - (strokeWidth / 2))}
                    textAnchor="start"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_height - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={8}
                >{frecuencyTable.intervals[i]}</Text >
            )
        }

        let value;
        if (showValue) {
            value = (
                <Text
                    dx={x + ((fy) * width - strokeWidth)}
                    dy={space / 2 + y - ((interval_height / 2) - (strokeWidth / 2))}
                    textAnchor="end"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_height - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={10}
                >{(frecuencyTable.frequency_data[i]).toFixed(1)}</Text >
            )
        }

        return <>
            {/* <Path
                key={"x" + i}
                strokeWidth={1}
                stroke={"#66666666"}
                fill={"transparent"}
                d={[
                    "M", x, space / 2 + y - ((interval_height / 2) - (strokeWidth / 2)),
                    "L", x + (width - strokeWidth), space / 2 + y - ((interval_height / 2) - (strokeWidth / 2)),
                ].join(" ")}
            /> */}
            <Path
                key={"r" + i}
                strokeWidth={strokeWidth}
                stroke={frecuencyTable.intervals_color[i]}
                fill={"transparent"}
                d={[
                    "M", x, space / 2 + y - (interval_height - (strokeWidth / 2)),
                    "L", x + ((fy) * width - strokeWidth), space / 2 + y - (interval_height - (strokeWidth / 2)),
                    "L", x + ((fy) * width - strokeWidth), y - space / 2 - ((strokeWidth / 2)),
                    "L", x, y - space / 2 - ((strokeWidth / 2))
                ].join(" ")}
            />
            {label}
            {value}

        </>

    })
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {new Array(5).fill(0).map((a, i) => {
            return <Path
                key={"r" + i}
                strokeWidth={1}
                stroke={"#66666666"}
                fill={"transparent"}
                d={[
                    "M", i * (width / 5), 0,
                    "L", i * (width / 5), height,
                ].join(" ")}
            />
        })}
        {Gra}
    </Svg>
}

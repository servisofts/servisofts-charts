import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { Data, SChartPropsType, SvgStyle, ViewBox } from "../type"
import FrecuencyTable from "../Model/FrequencyTable"
import { color_random } from "../Functions"


// type Grid = {
//     viewBox: ViewBox,
//     data: Data
// } & SvgStyle
export default (props: SChartPropsType) => {
    const { viewBox, data } = props;
    let { width, height, x, y } = viewBox
    const table = new FrecuencyTable(data);

    const colCount = table.intervals.length;
    const rowCount = 7;
    const fontSize = 10;
    const interval_width = width / (colCount)
    const interval_height = (height / rowCount)
    let xi = x;
    const PaintVertical = new Array(colCount + 1).fill(1).map((a, i) => {
        xi += interval_width;
        const xl = xi - (interval_width / 2) + 3
        const yl = height + y + 4
        return <>
            <Path key={"r" + i} d={[
                "M", xi - interval_width, y,
                "L", xi - interval_width, height + y,
            ].join(" ")}
                {...props}
            />
            <Text
                dx={xl}
                dy={yl}
                textAnchor="end"
                transform={`rotate(-90 ,${xl},${yl})`}
                fill={"#fff"}
                fontSize={fontSize}
            >{table.intervals[i]}</Text >
        </>
    })

    let yi = y + height;
    const PaintHorizontal = new Array(rowCount + 1).fill(1).map((a, i) => {
        yi -= interval_height;
        return <>
            <Text
                dx={x - 4}
                dy={(yi + interval_height) + (fontSize / 2) - 2}
                textAnchor="end" fill={"#fff"}
                fontSize={fontSize}
            >{Math.round(i * interval_height)}</Text>
            <Path key={"r" + i} d={[
                "M", x, (yi + interval_height),
                "L", width + x, (yi + interval_height),
            ].join(" ")}
                {...props}
            />
        </>
    })
    xi = x;

    const Gra = table.relative_frequency.map((f, i) => {
        xi += interval_width;
        return <Path key={"r" + i} d={[
            "M", xi - (interval_width / 2), y + (height - (f * height)),
            "L", xi - (interval_width / 2), height + y,
        ].join(" ")}
            // {...props}
            strokeWidth={interval_width * 0.8}
            stroke={color_random()}
        />
    })

    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {PaintVertical}
        {PaintHorizontal}
        {Gra}
    </Svg>
}
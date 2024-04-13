import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

const Guide = (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    return <>{
        new Array(props.frecuencyTable.parts + 1).fill(0).map((a, i) => {
            const xcenter = (i * (width / props.frecuencyTable.parts)) + x
            return <>
                <Path
                    key={"r" + i}
                    strokeWidth={1}
                    stroke={"#666"}
                    fill={"transparent"}
                    d={[
                        "M", xcenter, y,
                        "L", xcenter, height + y,
                    ].join(" ")}
                />
                <Path
                    key={"r" + i}
                    strokeWidth={1}
                    stroke={"#666"}
                    fill={"transparent"}
                    d={[
                        "M", x, height + y,
                        "L", width + x, height + y,
                    ].join(" ")}
                />
                <Text
                    dx={xcenter}
                    dy={height + y + 10}
                    textAnchor="middle"
                    fill={"#fff"}
                    fontSize={10}
                >{props.frecuencyTable.scale * i}</Text >
            </>
        })
    }
    </>
}

const recursive_niveles = (props: SChartPropsType, index = 0, key = "") => {
    if (!props.frecuencyTable.niveles[index]) return null;
    let { width, height, x, y } = props.viewBox
    const heightInterval = (height / props.frecuencyTable.niveles[index].length);
    let padding = heightInterval * 0.1;
    return props.frecuencyTable.niveles[index].map((a, i) => {


        let indexAux = props.frecuencyTable.intervals.findIndex(itm => itm == (!key ? a : key + "-" + a));
        console.log(props.frecuencyTable);
        let fy = 0;
        if (indexAux > -1) {
            fy = props.frecuencyTable.frequency[indexAux] / (props.frecuencyTable.parts * props.frecuencyTable.scale);
            padding = 0;
        }
        const ys = ((i * heightInterval) + y) + (padding / 2)
        const ye = ((i * heightInterval) + heightInterval + y) - (padding / 2)
        const ycenter = (i * heightInterval) + (heightInterval / 2) + y
        const strokeWidth = 2;

        return <>
            <Text
                dx={x - (20 * (props.frecuencyTable.niveles.length - 1 - index)) - 10}
                dy={ycenter}
                textAnchor="end"
                fill={"#fff"}
                fontSize={10}
            >{a}</Text >
            {indexAux <= -1 ? null : <Path
                key={"r" + i}
                strokeWidth={strokeWidth}
                stroke={props.frecuencyTable.intervals_color[indexAux]}
                fill={props.frecuencyTable.intervals_color[indexAux] + "22"}
                // fill={"transparent"}
                d={[
                    "M", x, ys + strokeWidth,
                    "L", (width * fy) + x, ys + strokeWidth,
                    "L", (width * fy) + x, ye - strokeWidth,
                    "L", x, ye - strokeWidth,
                    // "L", x, ys,
                ].join(" ")}
            />}
            {recursive_niveles({
                ...props, viewBox: {
                    ...props.viewBox,
                    height: heightInterval - padding,
                    y: ys
                }
            }, index + 1, !key ? a : key + "-" + a)}
        </>
    })
}
const Niveles = (props: SChartPropsType) => {
    return <>
        {recursive_niveles(props, 0, "")}
    </>
}
export default (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    let newViewBox = { width: width - 100, height: height - 30, x: 90, y: 12 }
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        <Guide {...props} viewBox={newViewBox} />
        {/* <Intervals {...props} viewBox={newViewBox} /> */}
        <Niveles {...props} viewBox={newViewBox} />
    </Svg>
}

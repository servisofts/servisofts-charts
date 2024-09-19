import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

const Guide = (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    return <>{
        new Array(props.frecuencyTable.parts + 1).fill(0).map((a, i) => {
            // const xcenter = (i * (width / props.frecuencyTable.parts)) + x
            const ycenter = (y + height) - (i * (height / props.frecuencyTable.parts))
            return <>
                <Path
                    key={"r" + i}
                    strokeWidth={1}
                    stroke={"#666"}
                    fill={"transparent"}
                    d={[
                        "M", x, ycenter,
                        "H", x + width,
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
                    dx={x - 4}
                    dy={ycenter}
                    textAnchor="end"
                    fill={props.textColor ?? "#000"}
                    fontSize={10}
                    translateY={4}
                >{props.frecuencyTable.range_min + (props.frecuencyTable.scale * i)}</Text >
            </>
        })
    }
    </>
}

const recursive_niveles = (props: SChartPropsType, index = 0, key = "") => {
    if (!props.frecuencyTable.niveles[index]) return null;
    let { width, height, x, y } = props.viewBox
    const heightInterval = (height / props.frecuencyTable.niveles[index].length);
    const widthInterval = (width / props.frecuencyTable.niveles[index].length);
    // let padding = widthInterval * 0.1;
    let padding = heightInterval * (props.space ?? 0);
    let paddingV = heightInterval * 0.1;
    // console.log(props.frecuencyTable)
    return props.frecuencyTable.niveles[index].map((a, i) => {


        let indexAux = props.frecuencyTable.intervals.findIndex(itm => itm == (!key ? a : key + "-" + a));
        // console.log(props.frecuencyTable);
        let fy = 0;
        if (indexAux > -1) {
            fy = props.frecuencyTable.relative_frequency_scaled[indexAux]
            padding = 0;
            paddingV = 0
        }
        if (props.frecuencyTable.niveles[index].length >= index) {
            padding = padding;
            paddingV = paddingV
        }
        const ys = ((i * heightInterval) + y) + (padding / 2)
        const xs = ((i * widthInterval) + x) + (padding / 2)
        const ye = ((i * heightInterval) + heightInterval + y) - (padding / 2)
        const xe = ((i * widthInterval) + widthInterval + x) - (padding / 2)
        const ycenter = ys + (heightInterval / 2)
        const strokeWidth = props.strokeWidth;

        return <>
            {!props.showLabel ? null :
                <Text
                    dx={(xs + strokeWidth + (widthInterval / 2)) - padding / 2}
                    dy={height + y + 12 + paddingV}
                    // translateY={4}
                    textAnchor="middle"
                    fill={props.textColor ?? "#000"}
                    fontSize={10}
                >{a}</Text >
            }
            {indexAux <= -1 ? null : <><Path
                key={"r" + i}
                strokeWidth={strokeWidth}
                stroke={props.frecuencyTable.intervals_color[indexAux]}
                fill={props.frecuencyTable.intervals_color[indexAux] + "22"}
                // fill={"transparent"}
                d={[
                    "M", xs + strokeWidth + padding, height + y,
                    "V", (height + y) - ((height) * fy),
                    "H", xe - strokeWidth,
                    "V", y + height,
                    // "Z"
                ].join(" ")}
            />{!props.showValue ? null : <Text
                dx={xs + (widthInterval / 2)}
                dy={(height + y) - ((height) * fy) - 4}
                textAnchor="middle"
                fill={props.textColor ?? "#000"}
                fontSize={10}
            >{props.frecuencyTable.frequency_data[indexAux]}</Text >}
            </>}
            {recursive_niveles({
                ...props, viewBox: {
                    ...props.viewBox,
                    width: widthInterval - padding,
                    x: xs
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
    let newViewBox = { width: width, height: height, x: x, y: y }
    if (!props.showGuide && props.showLabel) {
        newViewBox = { width: width, height: height - 38, x: 0, y: 4 }
    }

    if (props.showGuide && !props.showLabel) {
        newViewBox = { width: width - 38, height: height - 8, x: 30, y: 4 }
    }


    if (props.showGuide && props.showLabel) {
        newViewBox = { width: width - 38, height: height - 38, x: 30, y: 4 }
    }


    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >

        {!props.showGuide ? null : <Guide {...props} viewBox={newViewBox} />}
        {/* <Intervals {...props} viewBox={newViewBox} /> */}
        <Niveles {...props} viewBox={newViewBox} />
    </Svg>
}

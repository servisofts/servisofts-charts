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
                    fill={props.textColor ?? "#000"}
                    fontSize={10}
                >{props.frecuencyTable.range_min + (props.frecuencyTable.scale * i)}</Text >
            </>
        })
    }
    </>
}

const recursive_niveles = (props: SChartPropsType, index = 0, key = "") => {
    if (!props.frecuencyTable.niveles[index]) return null;
    let { width, height, x, y } = props.viewBox
    const textColor = props.textColor ?? "#000"
    const heightInterval = (height / props.frecuencyTable.niveles[index].length);
    let padding = heightInterval * (props.space ?? 0);
    return props.frecuencyTable.niveles[index].map((a, i) => {


        let indexAux = props.frecuencyTable.intervals.findIndex(itm => itm == (!key ? a : key + "-" + a));
        // console.log(props.frecuencyTable);
        let fy = 0;
        if (indexAux > -1) {
            fy = props.frecuencyTable.relative_frequency_scaled[indexAux]
            padding = 0;
        }
        if (props.frecuencyTable.niveles[index].length >= index) {
            padding = padding;
        }
        const ys = ((i * heightInterval) + y) + (padding / 2)
        const ye = ((i * heightInterval) + heightInterval + y) - (padding / 2)
        const ycenter = ys + (heightInterval / 2)
        const strokeWidth = props.strokeWidth;


        const xf = x - 4 - ((props.frecuencyTable.niveles.length - 1 - index) * (x-20))
        return <>
            {!props.showLabel ? null :
                <Text
                    dx={xf}
                    dy={ycenter - (padding / 2)}
                    translateY={4}
                    transform={`rotate(${indexAux <= -1 ? -90 : 0},${xf} , ${ycenter - (padding / 2)})`}
                    textAnchor={indexAux <= -1 ? "middle" : "end"}
                    fill={textColor}
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
                    "M", x, ys + strokeWidth,
                    "H", ((width) * fy) + x,
                    "V", ye - strokeWidth,
                    "H", x,
                    // "Z"
                ].join(" ")}
            />{!props.showValue ? null : <Text
                dx={((width) * fy) + x + 4}
                dy={ycenter - (padding / 2)}
                translateY={4}
                textAnchor="start"
                fill={textColor}
                fontSize={10}
            >{props.frecuencyTable.frequency_data[indexAux]}</Text >}
            </>}
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
    let newViewBox = { width: width - 16, height: height - 18, x: 8, y: 4 }
    if (!props.showGuide && props.showLabel) {
        newViewBox = { width: width - 70, height: height, x: 66, y: 0 }
    }
    if (!props.showGuide && !props.showLabel) {
        newViewBox = { width: width, height: height, x: 0, y: 0 }
    }
    if (props.showGuide && !props.showLabel) {
        newViewBox = { width: width - 8, height: height - 30, x: 4, y: 4 }
    }
    if (props.showGuide && props.showLabel) {
        newViewBox = { width: width - 70, height: height - 30, x: 66, y: 4 }
    }


    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
        {!props.showGuide ? null : <Guide {...props} viewBox={newViewBox} />}
        {/* <Intervals {...props} viewBox={newViewBox} /> */}
        <Niveles {...props} viewBox={newViewBox} />
    </Svg>
}

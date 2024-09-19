import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

const Guide = (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    const sort = (a, b) => a > b ? 1 : -1;
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
                    fontSize={8}
                    translateY={2}
                >{props.frecuencyTable.range_min + (props.frecuencyTable.scale * i)}</Text >
            </>
        })
    }
        {
            props.frecuencyTable.niveles[props.frecuencyTable.niveles.length - 1].sort(props.sort ?? sort).map((a, i) => {
                // const xcenter = (i * (width / props.frecuencyTable.parts)) + x
                const xc = (i * (width / (props.frecuencyTable.niveles[props.frecuencyTable.niveles.length - 1].length - 1)))
                return <>
                    {/* <Path
                        key={"r" + i}
                        strokeWidth={1}
                        stroke={"#666"}
                        fill={"transparent"}
                        d={[
                            "M", x + xc, height,
                            "V", y,
                        ].join(" ")}
                    /> */}
                    <Text
                        dx={x + xc}
                        dy={height + y + 2}
                        textAnchor="end"
                        transform={`rotate( -90,${x + xc} , ${height + y + 2})`}
                        // transform={`rotate(${indexAux <= -1 ? -90 : 0},${xf} , ${ycenter - (padding / 2)})`}
                        // textAnchor={indexAux <= -1 ? "middle" : "end"}
                        fill={props.textColor ?? "#000"}
                        fontSize={7}
                        translateY={0}
                    >{a}</Text >
                </>
            })
        }
    </>
}



const recursive_niveles_2 = (props: SChartPropsType, index = 0, key = "", color = "#666") => {
    const current_lvl: any[] = props.frecuencyTable.niveles[index];
    if (!current_lvl) return;


    const nivel_proximo = props.frecuencyTable.niveles[index + 1];
    if (nivel_proximo) {
        return current_lvl.map((lvl, i) => {
            let color = !props.colors ? color_random() : (props.colors[i] ?? color_random())
            return recursive_niveles_2(props, index + 1, !key ? lvl : key + "-" + lvl, color);
        })
    }


    let { width, height, x, y } = props.viewBox
    let path = [];

    const intervalWidth = (width) / (current_lvl.length - 1)
    current_lvl.map((lvl, i) => {
        const k = !key ? lvl : key + "-" + lvl
        const ii = props.frecuencyTable.intervals.findIndex(a => a == k);
        const f = props.frecuencyTable.relative_frequency_scaled[ii];
        if (i == 0) {
            path.push(...["M", x + (intervalWidth * (i)), y + height - (height * f)])
        } else {
            path.push(...["L", x + (intervalWidth * (i)), y + height - (height * f)])
        }
        // const data = props.frecuencyTable.data[k];
        // 
    })

    return <Path
        strokeWidth={2}
        stroke={color}
        fill={"transparent"}
        d={path.join(" ")}
    />
}
const Niveles = (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    let color = !props.colors ? color_random() : props.colors[0]
    return <>
        {recursive_niveles_2(props, 0, "", color)}
    </>
}
export default (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    let newViewBox = { width: width, height: height, x: x, y: y }
    if (!props.showGuide && props.showLabel) {
        newViewBox = { width: width, height: height - 38, x: 0, y: 4 }
    }

    if (props.showGuide && !props.showLabel) {
        newViewBox = { width: width - 38, height: height - 40, x: 30, y: 4 }
    }


    if (props.showGuide && props.showLabel) {
        newViewBox = { width: width - 38, height: height - 58, x: 30, y: 4 }
    }

    // console.log(props.frecuencyTable.niveles)

    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >

        {!props.showGuide ? null : <Guide {...props} viewBox={newViewBox} />}
        {/* <Intervals {...props} viewBox={newViewBox} /> */}
        <Niveles {...props} viewBox={newViewBox} />
    </Svg>
}

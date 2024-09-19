import React from "react"
import { Circle, G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export const describePie = (x, y, radius, startAngle, endAngle, padding, spaces) => {
    if (!padding) {
        padding = 0.01
    }
    const space = radius - (radius - (padding * padding))
    var start = polarToCartesian(x, y, radius, endAngle - padding);
    var end = polarToCartesian(x, y, radius, startAngle + (padding / 2));
    var startCenter = polarToCartesian(x, y, space, endAngle - ((padding)));
    var endCenter = polarToCartesian(x, y, space, startAngle + ((padding) / padding));
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", endCenter.x, endCenter.y,
        "A", space, space, 0, 0, 1, startCenter.x, startCenter.y,
        "L", start.x, start.y,
    ].join(" ");
    return d;
}

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}



export default (props: SChartPropsType) => {
    let { width, height, x, y } = props.viewBox
    // let newViewBox = { width: width , height: height , x: x, y: y }
    const w = Math.min(width, height);
    const radio = w / 2;
    const center = w / 2;
    let padding = (360 / props.frecuencyTable.intervals.length) * (props.space * 0.5);
    const render_circles = () => {
        // if (!this.props.data) return null;
        // var arr = Func.simplifyObjectValue(this.props.data);
        // const sum = Func.sum(arr)
        var currentAngle = 0;
        return props.frecuencyTable.intervals.map((label, index) => {
            // if (!obj.color) obj.color = Func.color_random();
            var angle = 0;
            const fy = props.frecuencyTable.relative_frequency[index]
            // if (typeof obj.val == "number") {
            angle = ((fy * 100) / 100) * 360;
            // } else {
            // if (index > -1) {
            //     // fy = props.frecuencyTable.relative_frequency_scaled[indexAux]
            //     padding = 0;
            // }
            // }
            let ptext = polarToCartesian(center, center, radio * 0.75, currentAngle + (angle / 2))

            const p = <Path d={describePie(center, center, radio, currentAngle, currentAngle + angle, padding, 0)}
                strokeWidth={props.strokeWidth}
                stroke={props.frecuencyTable.intervals_color[index]}
                fill={props.frecuencyTable.intervals_color[index] + "22"}
            // {...this.props.style}
            // {...obj.style}
            />
            currentAngle += angle;
            return <>
                {p}
                <Text
                    dx={ptext.x}
                    dy={ptext.y}
                    textAnchor="middle"
                    fill={props.textColor ?? "#000"}
                    fontSize={10}
                    translateY={0}
                >{(Math.round(100 * fy))}%</Text >
            </>
        })
    }

    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {/* <Circle r={center} cx={center} cy={radio} fill={"transparent"} strokeWidth={1} stroke={"#f0f"} /> */}
        
        {render_circles()}
    </Svg>
}

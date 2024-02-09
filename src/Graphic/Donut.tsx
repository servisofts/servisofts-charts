import React from "react"
import { G, Path, Rect, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
const describeDonutPath = (x, y, radius, startAngle, endAngle, size) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var start2 = polarToCartesian(x, y, radius - size, endAngle);
    var end2 = polarToCartesian(x, y, radius - size, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", end2.x, end2.y,
        "A", radius - size, radius - size, 0, largeArcFlag, 1, start2.x, start2.y,
        "L", start.x, start.y,
    ].join(" ");

    return d;
}
export default ({ viewBox, frecuencyTable, strokeWidth = 2 }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    let min = width > height ? height : width;
    const center = min / 2;

    const scale = center - (strokeWidth / 2);
    const radio = center * 1;
    var currentAngle = 0;
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        var angle = 0;
        angle = ((f * 100) / 100) * 360;
        const p = <Path
            key={"r" + i}
            strokeWidth={strokeWidth}
            stroke={frecuencyTable.intervals_color[i]}
            fill={"transparent"}
            d={describeDonutPath(center, center, scale, currentAngle, currentAngle + angle, radio)}
        />
        currentAngle += angle;
        return p;
    })
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {Gra}
    </Svg>
}
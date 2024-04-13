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
const describeDonutPath = (x, y, radius, startAngle, endAngle, size, rx = 0) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var start2 = polarToCartesian(x, y, radius - size, endAngle);
    var end2 = polarToCartesian(x, y, radius - size, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "A", rx, rx, 0, 0, 0, end2.x, end2.y,
        "A", radius - size, radius - size, 0, largeArcFlag, 1, start2.x, start2.y,
        "A", rx, rx, 0, 0, 0, start.x, start.y,
    ].join(" ");

    return d;
}
export default ({ viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2 }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    let min = width > height ? height : width;
    const center = min / 2;
    const radius = center - (strokeWidth / 2);

    const max = frecuencyTable.max("relative_frequency")
    var currentAngle = 0;

    const separacion = ((min / (frecuencyTable.intervals.length)) * 0.05) + ((strokeWidth ?? 0))
    // const grosor = radius / this.props.data.length
    const grosor = ((radius - (separacion * frecuencyTable.intervals.length)) / (frecuencyTable.intervals.length + 1.2))
    // const scale = center - (strokeWidth / 2);
    // const radio = center * 0.5;
    const rx = 0.1;
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        var angle = 0;
        angle = ((f * 0.75) / max) * 360;
        let x = (((i + 1) * (separacion + grosor)) + separacion / 2);
        const color =frecuencyTable.intervals_color[i];
        const p = <Path
            key={"r" + i}
            strokeWidth={strokeWidth}
            // fill={color}
            stroke={color}
            // stroke={"transparent"}
            fill={"transparent"}
            d={describeDonutPath(center, center, grosor + x, 0, angle, grosor, rx)}
        />
        const pBack = <Path d={describeDonutPath(center, center, grosor + x, 0, 360 * 0.75, grosor, rx)}
            fill={color}
            opacity={0.1}
        />

        var start = polarToCartesian(center, center, (grosor / 2) + x, 0);
        var end = polarToCartesian(center, center, (grosor / 2) + x, angle);
        currentAngle += angle;


        let label;
        if (showLabel) {
            label = (
                <Text
                    dx={start.x - (grosor / 2) - 4}
                    dy={start.y + 2}
                    textAnchor="end"
                    fill={"#fff"}
                    fontSize={10}
                >{frecuencyTable.intervals[i]}</Text >
            )
        }

        let value;
        if (showValue) {
            value = (<Text
                dx={end.x}
                dy={end.y}
                textAnchor="middle"
                fill={"#fff"}
                // transform={`rotate(0 ,0,0)`}
                fontSize={10}
            >{(frecuencyTable.frequency_data[i]).toFixed(1)}</Text >
            )
        }


        return <>
            {pBack}
            {p}
            {label}
            {value}
        </>;
    })
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        {Gra}
    </Svg>
}
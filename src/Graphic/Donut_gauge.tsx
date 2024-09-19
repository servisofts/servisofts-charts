import React from "react"
import { Circle, G, Path, Rect, Svg, Text } from "react-native-svg"
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
    let cor = 10;
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        // "L", end2.x, end2.y,
        "A", rx, rx, 0, 0, 0, end2.x, end2.y,
        "A", radius - size, radius - size, 0, largeArcFlag, 1, start2.x, start2.y,
        "A", rx, rx, 0, 0, 0, start.x, start.y,
    ].join(" ");

    return d;
}


const Guide = (props: SChartPropsType) => {
    const { viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2, space, textColor } = props;
    let { width, height, x, y } = props.viewBox

    let min = width > height ? height : width;
    const center = (min / 2);
    const radius = center - (strokeWidth / 2);
    const totl = radius / (frecuencyTable.intervals.length + 1)
    const sobrante = 4;
    return <>
        {
            new Array(props.frecuencyTable.parts + 1).fill(0).map((a, i) => {
                // const xcenter = (i * (width / props.frecuencyTable.parts)) + x
                // const ycenter = (y + height) - (i * (height / props.frecuencyTable.parts))
                let pola = polarToCartesian(center + x, center + y, radius + sobrante, ((270 / props.frecuencyTable.parts) * (i)));
                let pola2 = polarToCartesian(center + x, center + y, totl - sobrante, ((270 / props.frecuencyTable.parts) * (i)));
                let polatext = polarToCartesian(center + x, center + y, radius + sobrante + 8, ((270 / props.frecuencyTable.parts) * (i)));
                return <>
                    <Path
                        key={"r" + i}
                        strokeWidth={1}
                        stroke={"#666666"}
                        // opacity={0.8}
                        fill={"transparent"}
                        d={[
                            "M", pola2.x, pola2.y,
                            "L", pola.x, pola.y,
                        ].join(" ")}
                    />
                    <Text
                        dx={polatext.x}
                        dy={polatext.y}
                        textAnchor="middle"
                        fill={props.textColor ?? "#000"}
                        fontSize={8}
                        translateY={4}
                    >{props.frecuencyTable.range_min + (props.frecuencyTable.scale * i)}</Text >
                </>
            })
        }
    </>
}


export default (props: SChartPropsType) => {
    const { viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2, space, textColor } = props;
    let { width, height, x, y } = viewBox


    let newViewBox = { width: width, height: height, x: x, y: y }
    if (!props.showGuide && props.showLabel) {
        // newViewBox = { width: width, height: height - 38, x: 0, y: 4 }
    }

    const padding = 20;
    if (props.showGuide && !props.showLabel) {
        newViewBox = { width: width - (padding * 2), height: height - (padding * 2), x: x + (padding), y: y + (padding) }
    }


    if (props.showGuide && props.showLabel) {
        newViewBox = { width: width - (padding * 2), height: height - (padding * 2), x: x + (padding), y: y + (padding) }
    }

    let min = (newViewBox.width) > (newViewBox.height) ? (newViewBox.height) : (newViewBox.width);
    const center = min / 2;
    const radius = center - (strokeWidth / 2);

    // const max = frecuencyTable.max("relative_frequency")
    // const max = frecuencyTable.max_value;
    var currentAngle = 0;

    const separacion = ((min / (frecuencyTable.intervals.length + 1)) * (space ?? 0)) + ((strokeWidth ?? 0))
    // const grosor = radius / this.props.data.length
    const grosor = ((radius - (separacion * (frecuencyTable.intervals.length + 1))) / (frecuencyTable.intervals.length + 1))
    // const grosor = radius / (frecuencyTable.intervals.length + 1)
    // const scale = center - (strokeWidth / 2);
    // const radio = center * 0.5;
    const rx = 0.1;
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        var angle = 0;
        angle = ((f * 0.75)) * 360;
        let xi = (((i + 1) * (grosor + separacion)));
        const color = frecuencyTable.intervals_color[i];
        const p = <Path
            key={"r" + i}
            strokeWidth={strokeWidth}
            fill={color + "99"}
            stroke={color}

            // stroke={"transparent"}
            // fill={"transparent"}
            d={describeDonutPath(center + newViewBox.x, center + newViewBox.y, grosor + xi + (separacion / 2), 0, angle, grosor, rx)}
        />
        const pBack = <Path d={describeDonutPath(center + newViewBox.x, center + newViewBox.y, grosor + xi + (separacion / 2), 0, 360 * 0.75, grosor, rx)}
            fill={color}
            opacity={0.2}
        />

        var start = polarToCartesian(center + newViewBox.x, center + newViewBox.y, (grosor / 2) + xi, 0);
        var end = polarToCartesian(center + newViewBox.x, center + newViewBox.y, (grosor / 2) + xi, angle);
        var end2 = polarToCartesian(center + newViewBox.x, center + newViewBox.y, (grosor / 2) + xi + separacion, angle);
        currentAngle += angle;


        let label;
        if (showLabel) {
            label = (
                <Text
                    dx={start.x - (grosor * 0.7)}
                    dy={start.y - (separacion / 2) + (grosor * 0.7 / 2)}
                    textAnchor="end"
                    fill={textColor ?? "#000"}
                    fontSize={grosor * 0.7}
                >{frecuencyTable.intervals[i]}</Text >
            )
        }

        let value;
        if (showValue) {
            value = (<Text
                dx={end2.x}
                dy={end2.y}
                textAnchor="middle"
                fill={textColor ?? "#000"}
                fontSize={grosor * 0.5}
            // transform="translate(10,-10) rotate(1)"
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
        {!props.showGuide ? null : <Guide {...props} viewBox={newViewBox} />}
        {Gra}
    </Svg>
}
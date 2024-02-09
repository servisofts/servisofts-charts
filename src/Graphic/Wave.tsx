import React from "react"
import { Defs, G, LinearGradient, Path, Rect, Stop, Svg, Text } from "react-native-svg"
import { SChartPropsType } from "../type"
import { color_random } from "../Functions"

export default ({ viewBox, frecuencyTable, showLabel, showValue, strokeWidth = 2  }: SChartPropsType) => {
    let { width, height, x, y } = viewBox
    const interval_width = width / (frecuencyTable.intervals.length)
    let space = 0 * interval_width;

    let max = frecuencyTable.max("relative_frequency")
    const path: any = ["M", 0, height]
    const Gra = frecuencyTable.relative_frequency.map((f, i) => {
        let fx = f / max;
        x += interval_width;

        // Puntos de la curva
        const midX = x - (space / 2) - (strokeWidth / 2);
        const midY = y + ((height) - ((fx) * height));
        const cp1x = (midX + path[path.length - 2]) / 2;  // Promedio del punto anterior y el punto medio
        const cp1y = path[path.length - 1];  // Mismo y que el último punto
        const cp2x = (midX + path[path.length - 2]) / 2;  // Igual que cp1x
        const cp2y = midY;  // Igual que midY

        // Agregar curva al path
        path.push(...[
            "C",
            cp1x, cp1y,  // Primer punto de control
            cp2x, cp2y,  // Segundo punto de control
            midX, midY   // Punto final de la curva
        ]);

        let label;
        if (showLabel) {
            label = (
                <Text
                    dx={x - (interval_width / 2)}
                    dy={y + height - 6}
                    textAnchor="middle"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_width - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={8}
                >{frecuencyTable.intervals[i]}</Text >
            )
        }

        let value;
        if (showValue) {
            value = (
                <Text
                    dx={x - (interval_width / 2)}
                    dy={y + height - ((fx) * height) + 12}
                    textAnchor="middle"
                    // transform={`rotate(-90 ,${space / 2 + x - (interval_width - (strokeWidth / 2))},${y + height})`}
                    fill={"#fff"}
                    fontSize={10}
                >{(frecuencyTable.frequency_data[i]).toFixed(1)}</Text >
            )
        }
        return <>
            {label}
            {value}
        </>

    })
    return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                {frecuencyTable.intervals.map((a, i) => <Stop offset={i / frecuencyTable.intervals.length} stopColor={color_random()} stopOpacity="1" />)}
            </LinearGradient>
        </Defs>
        {Gra}
        <Path
            key={"r"}
            strokeWidth={strokeWidth}
            // stroke={color_random()}
            stroke={"url(#grad)"}
            // stro
            fill={"transparent"}
            d={path.join(" ")}
        />
    </Svg>
}
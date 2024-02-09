import React from 'react'
import { Svg, Rect, Path, PathProps } from 'react-native-svg';
import { OptionsType } from '../type';



export const SSvg = ({ viewBox, children }: { children: any, viewBox: OptionsType["viewBox"] }) => {
    return <Svg height="100%" width="100%" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} >
        {children}
    </Svg>
}
export const Border = ({ viewBox }) => {
    const { width, height } = viewBox;
    const strokeWidth = 2;
    return <Path d={[
        "M", 0, 0,
        "L", width, 0,
        "L", width, height,
        "L", 0, height,
        "L", 0, 0,
    ].join(" ")}
        stroke={"#fff"}
        strokeWidth={1}
    />
}

export const GridHorizontal = ({ viewBox, size, stroke, strokeWidth }) => {
    const { width, height } = viewBox;
    let y = viewBox?.y ?? 0;
    let x = viewBox?.x ?? 0;
    return new Array(Math.round(height / size) + 1).fill(1).map((a, i) => {
        y += size;
        return <Path d={[
            "M", x, height - (y - size),
            "L", width + x, height - (y - size),
        ].join(" ")} stroke={stroke} strokeWidth={strokeWidth}
        />
    })
}
export const GridVertical = ({ viewBox, size, stroke, strokeWidth }) => {
    const { width, height } = viewBox;
    let y = viewBox?.y ?? 0;
    let x = viewBox?.x ?? 0;
    return new Array(Math.round(width / size) + 1).fill(1).map((a, i) => {
        x += size;
        return <Path d={[
            "M", x - size, y,
            "L", x - size, height + y,
        ].join(" ")} stroke={stroke} strokeWidth={strokeWidth}
        />
    })
}
export const Grid = ({ viewBox, size, strokeWidth = 1, stroke = "#666" }) => {
    return <>
        {...GridVertical({ viewBox: viewBox, size: size, stroke: stroke, strokeWidth: strokeWidth })},
        {...GridHorizontal({ viewBox: viewBox, size: size, stroke: stroke, strokeWidth: strokeWidth })},
    </>

}
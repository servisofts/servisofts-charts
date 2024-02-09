import React from "react"
import { Circle, Path } from "react-native-svg"
import { Data, SvgStyle, ViewBox } from "../type"

type TypeCircle = {
    viewBox: ViewBox,
    data: Data
} & SvgStyle

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
export default (props: TypeCircle) => {
    const { viewBox, data } = props;
    const { width, height, x, y } = viewBox
    const center = {
        x: x + (width / 2),
        y: y + (height / 2),
    }

    const divisor = 15;
    const ncirculos = 10;
    const radio = Math.min(width, height) / 2;
    const radioStep = radio / ncirculos
    const RADIOS = new Array(Math.round(360 / divisor)).fill(1).map((a, i) => {
        const pt = polarToCartesian(center.x, center.y, radio, i * divisor)
        return <Path d={[
            "M", center.x, center.y,
            "L", pt.x, pt.y
        ].join(" ")} fill={"transparent"} {...props} />
    })
    const CIRCULOS = new Array(ncirculos).fill(1).map((a, i) => {
        return <Circle cx={center.x} cy={center.y} r={(i + 1) * radioStep} fill={"transparent"} {...props} />
    })
    return <>
        {CIRCULOS}
        {RADIOS}
    </>
    return
}
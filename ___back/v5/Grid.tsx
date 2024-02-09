import React from "react"
import { Path } from "react-native-svg"
import { SvgStyle, ViewBox } from "../type"

type Grid = {
    viewBox: ViewBox,
    size: number
} & SvgStyle

export default (props: Grid) => {
    const { viewBox, size } = props;
    const { width, height, x, y } = viewBox
    let xi = x;
    let yi = y;
    return <>
        {/* <Path d={[
            "M", x, y,
            "L", x + width, y,
            "L", x + width, y + height,
            "L", x, y + height,
            "L", x, y,
        ].join(" ")} {...props}
        /> */}
        {new Array(Math.ceil(width / size)).fill(1).map((a, i) => {
            xi += size;
            return <Path key={"r" + i} d={[
                "M", xi - size, y,
                "L", xi - size, height + y,
            ].join(" ")} {...props}
            />
        })}
        {new Array(Math.ceil(height / size)).fill(1).map((a, i) => {
            yi += size;
            return <Path key={"c" + i} d={[
                "M", x, (yi - size),
                "L", width + x, (yi - size),
            ].join(" ")} {...props}
            />
        })}
    </>
}
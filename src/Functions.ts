import { ViewBox } from "./type";


type Padding = number | { bottom?: number, top?: number, left?: number, right?: number }
export const viewBoxPadding = (viewBox: ViewBox, padding: Padding): ViewBox => {
    const { x, y, height, width } = viewBox
    if (width <= 0 || height <= 0) return viewBox;
    if (typeof padding == "number") {
        return {
            x: x + padding,
            y: y + padding,
            width: width - (padding * 2),
            height: height - (padding * 2)
        }
    }
    return {
        x: x + (padding.left ?? 0),
        y: y + (padding.top ?? 0),
        width: width - ((padding.right ?? 0) + (padding.left ?? 0)),
        height: height - ((padding.top ?? 0) + (padding.bottom ?? 0))
    }
}



export const color_random = () => {
    const rangeR = getRandom(100, 220);
    const rangeG = getRandom(50, 150);
    const rangeB = getRandom(190, 255);

    return "rgb(" + rangeR + ", " + rangeG + ", " + rangeB + ")";
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

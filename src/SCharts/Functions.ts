import { Platform } from "react-native";
import { DataPropsType, DataValueType } from "./type";
export const calcular_procentaje_100 = ({ val, max }) => {
    return (val / max) * 100;
}
export const simplifyObjectValue = (arr: DataPropsType[]) => {
    let arr2 = [...arr]
    Object.values(arr2).map(o => {
        if (typeof o.val != "number") {
            let sum = 0;
            Object.values(o.val).map(o => sum += o)
            o.val = sum;
        }
    })
    return arr2;
    // return (val / max);
}
export const calcular_procentaje = ({ val, max }) => {
    return (val / max);
}
export const number_to_porcent_string = (val) => {
    return parseFloat(val).toFixed(0) + "%";
}
export const calcular_maximo = (arr: DataPropsType[]) => {
    var max = 0;
    arr.map(a => {
        if (typeof a.val == "number") {
            if (max < a.val) max = a.val
        }
    })
    return max;
}
export const max = (arr: DataPropsType[]) => {
    var max = 0;
    arr.map(a => {
        if (typeof a.val == "number") {
            if (max < a.val) max = a.val
        }
    })
    return max;
}
export const sum = (arr: DataPropsType[]) => {
    var sum = 0;
    arr.map(a => {
        if (typeof a.val == "number") {
            sum += a.val
        } else {

        }
    })
    return sum;
}
export const calcular_promedio = (arr: DataPropsType[]) => {
    return sum(arr) / arr.length;
}
export const calcular_porcentaje_to_grados = (grados: number) => { return (100 - ((grados * 100) / 360)) }
export const calcular_grados_to_strokeDashoffset = (grados: number) => {
    // ((porcentaje_to_grados(10) / 100) * Math.PI))
    // return (100 - ((grados * 100) / 360))
    return (1 - (grados / 360)) * Math.PI
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

export const create_onPress = (callback: any): any => {
    if (Platform.OS == "web") {
        return {
            onClick: callback
        }
    }
    return {
        onPress: callback
    }
}

export const describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
export const describeDonutPath = (x, y, radius, startAngle, endAngle, size) => {
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
export const describeDonutPathRound = (x, y, radius, startAngle, endAngle, size, rx = 0) => {
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
export const describePie = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
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
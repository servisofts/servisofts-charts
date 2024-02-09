import React from "react"
import { SChartPropsType, } from "../type"
import { FlatList, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
const colorAccent = "#FF5599"

const sty = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,

    },
    text: {
        flex: 1,
        fontSize: 12,
        color: "#fff",

    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#666",

    },
    cell: {
        height: 20,
        borderColor: "#666",
        borderRightWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

const PaintFormat = (val: any) => {
    if (typeof val == "number") {
        return val.toFixed(2)
    }
    return val;
}

const Cell = (props: { flex: number, children?: any, style?: ViewStyle, styleText?: TextStyle, format?: boolean }) => {
    const { style, styleText, children, flex } = props;
    return <View style={[{ flex: flex, overflow: "hidden" }, sty.cell, style]}>
        <Text style={[sty.text, styleText]}>{props.format ? PaintFormat(children) : children}</Text>
    </View>
}
const Row = (props: { arr: (string | number)[], style?: ViewStyle, styleText?: TextStyle, index: any, indexl?: any }) => {
    const { arr, style, styleText, index } = props;
    return <View style={[sty.row, style, { backgroundColor: (index % 2 != 0) ? "#00000022" : "#FFFFFF22" }]}>
        <Cell flex={0.5} format={false} styleText={{ ...styleText }}>{props.indexl ?? props.index}</Cell>
        <Cell flex={2} format={false} styleText={{ ...styleText, color: colorAccent }}>{arr[0]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[1]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[2]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[3]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[4]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[5]}</Cell>
    </View >
}
export default (props: SChartPropsType) => {
    const { data, frecuencyTable } = props;
    console.log(frecuencyTable)
    return <View style={[sty.container]}>
        <Row arr={["", "frecuency data", "frecuency", "relative frequency", "acumulated frequency", "acumulated relative frequency"]} style={{ borderBottomWidth: 0 }} styleText={{ color: colorAccent, fontSize: 8, textAlign: "center", }} index={1} indexl={""} />
        <Row arr={["key", "fd", "f", "fr", "F", "Fr"]} styleText={{ fontWeight: "bold", fontSize: 14, color: colorAccent }} index={1} indexl={"#"} />
        <View style={sty.container} >
            <FlatList data={frecuencyTable.intervals} showsVerticalScrollIndicator={false}
                renderItem={p => <Row
                    arr={[
                        frecuencyTable.intervals[p.index],
                        frecuencyTable.frequency_data[p.index],
                        frecuencyTable.frequency[p.index],
                        frecuencyTable.relative_frequency[p.index],
                        frecuencyTable.acumulated_frequency[p.index],
                        frecuencyTable.acumulated_relative_frequency[p.index],
                    ]}
                    index={p.index + 1} />}
            />
        </View>
        <Row arr={["total", "", frecuencyTable.sum("frequency"), frecuencyTable.sum("relative_frequency"), frecuencyTable.sum("acumulated_frequency"), frecuencyTable.sum("acumulated_relative_frequency")]} style={{ borderBottomWidth: 1, }} styleText={{ color: colorAccent }} index={1} indexl={frecuencyTable.intervals.length} />
        <Row arr={["min", frecuencyTable.min("frequency_data"), frecuencyTable.min("frequency"), frecuencyTable.min("relative_frequency"), frecuencyTable.min("acumulated_frequency"), frecuencyTable.min("acumulated_relative_frequency")]} style={{ borderBottomWidth: 0 }} index={1} indexl={""} />
        <Row arr={["max", frecuencyTable.max("frequency_data"), frecuencyTable.max("frequency"), frecuencyTable.max("relative_frequency"), frecuencyTable.max("acumulated_frequency"), frecuencyTable.max("acumulated_relative_frequency")]} style={{ borderBottomWidth: 0 }} index={1} indexl={""} />

    </View>
}


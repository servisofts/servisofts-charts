import React from "react"
import { FlatList, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import Theme from "../Theme";
const colorAccent = "#FF5599"
const sty = StyleSheet.create({
    container: {
        width: "100%",
        flex:1,
        backgroundColor: "#202020"

    },
    text: {
        fontSize: 12,
        color: "#fff"
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
    return <View style={[{ flex: flex }, sty.cell, style]}>
        <Text style={[sty.text, styleText]}>{props.format ? PaintFormat(children) : children}</Text>
    </View>
}
const Row = (props: { arr: (string | number)[], style?: ViewStyle, styleText?: TextStyle, index: any }) => {
    const { arr, style, styleText, index } = props;
    return <View style={[sty.row, style, { backgroundColor: (index % 2 == 0) ? "#00000022" : "#ffffff22" }]}>
        <Cell flex={0.5} format={false} styleText={{ ...styleText, color: colorAccent }}>{props.index}</Cell>
        <Cell flex={2} format={false} styleText={{ ...styleText, color: colorAccent }}>{arr[0]}</Cell>
        <Cell flex={1} format styleText={styleText}>{arr[1]}</Cell>
        <Cell flex={1} format styleText={styleText}>{arr[2]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[3]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[4]}</Cell>
        <Cell flex={1.5} format styleText={styleText}>{arr[5]}</Cell>
    </View >
}

const calculate = (data) => {
    let tb = [];
    let f_sum = 0;
    let fr_sum = 0;
    let porcent_sum = 0;
    const datas = data;
    Object.keys(datas).map((key) => {
        f_sum += datas[key];
        tb.push([key, datas[key], 0, 0, f_sum, 0])
    })
    // Calcular frecuencias
    tb.map((row, index) => {
        row[2] = !row[1] ? 0 : (row[1] / f_sum);
        fr_sum += row[2];
        row[3] = (row[2] * 100)
        porcent_sum += row[3]
        row[5] = porcent_sum;
    })
    return {
        header: ["key", "f", "fr", "f%", "F", "F%"],
        table: tb,
        total: [tb.length, f_sum, fr_sum, porcent_sum, "", ""]
    };
}
export default ({ data }) => {
    const res = calculate(data);
    return <View style={[sty.container]}>
        {/* <Text style={sty.text}>{"Frequency distribution table"}</Text> */}
        <Row arr={res.header} styleText={{ fontWeight: "bold", fontSize: 18, color: colorAccent }} index={"#"} />
        <View style={Theme.container} >
            <FlatList data={res.table} showsVerticalScrollIndicator={false} renderItem={p => <Row arr={p.item} index={p.index} />} />
        </View>
        <Row arr={res.total} style={{ borderBottomWidth: 0 }} styleText={{ color: colorAccent }} index={""} />
    </View>
}
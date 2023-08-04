import React, { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, } from 'react-native'
import styles from "./styles"
import SCharts, { Options } from "../SCharts"
import { DataPropsType } from "../SCharts/type"

const generateRandom = () => Math.random() * 100 + 1

const data: DataPropsType[] = [
    { key: "Ventas", val: generateRandom() },
    { key: "Pedidos", val: generateRandom() },
    { key: "Facturas", val: generateRandom() },
    { key: "Devoluciones", val: generateRandom() },
    { key: "Otros", val: generateRandom() },
    { key: "Otros1", val: generateRandom() },
    { key: "Otros2", val: generateRandom() },
    { key: "Otros3", val: generateRandom() },
    { key: "Facturas", val: generateRandom() },
    { key: "Devoluciones", val: generateRandom() },
    { key: "Otros", val: generateRandom() },
    { key: "Otros1", val: generateRandom() },
    { key: "Otros2", val: generateRandom() },
    { key: "Otros3", val: generateRandom() },
]
// const data: DataPropsType = {
//     "2023-01-01": 10,
//     "2023-01-02": 10,
//     "2023-01-03": 10,
//     "2023-01-04": 10,
//     "2023-01-05": 10,
// }

const Option = ({ type, onPress }) => {
    return <TouchableOpacity style={{ borderWidth: 1, borderColor: "#666", borderRadius: 4, height: 30, padding: 4, minWidth: 100, justifyContent: "center", alignItems: "center" }} onPress={onPress}>
        <Text style={styles.text}>{type}</Text>
    </TouchableOpacity>
}

export default (props) => {
    const [type, setType] = useState(props?.route?.params?.type ?? "bar");
    return <View style={styles.container}>
        <View style={{ backgroundColor: "#202020" }}>
            <FlatList
                horizontal
                data={Object.keys(Options)}
                renderItem={p => <Option type={p.item} onPress={() => setType(p.item)} />} />

        </View>
        <SCharts type={type} data={data} />
    </View>
}
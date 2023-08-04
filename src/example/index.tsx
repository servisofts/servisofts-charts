import React, { useState } from "react"
import { View, Text, } from 'react-native'
import styles from "./styles"
import SCharts from "../SCharts"
import { DataPropsType } from "../SCharts/type"

const data: DataPropsType[] = [
    { key: "compras", val: 10 },
    { key: "ventas", val: 20 },
]
export default (props) => {
    return <View style={styles.container}>
        <SCharts type="bar" data={data} />
    </View>
}
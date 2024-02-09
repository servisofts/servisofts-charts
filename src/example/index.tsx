import React, { useEffect } from "react"
import { ScrollView, View } from 'react-native'
import styles from "./styles"
import SCharts from ".."
import data1 from "./datat1"
import data2 from "./datat2"
import data3 from "./datat3"
import { SChartPropsType } from "../type"
// const data = require("./datat1.json")
const data = [data1, data2, data3]
export default (props) => {
    let i = 0;
    let extraProps = {
        showLabel: true,
        showValue: true,
        strokeWidth: 2,
        // colors: ['#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fd5800', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff', '#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fd5800', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff', '#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fd5800', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff']
    }
    return <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", }}>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Table" />
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Barras" />
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Column" />
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Line" />
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Wave" />
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Donut"/>
            </View>
            <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Donut_gauge" />
            </View>
            {/* <View style={styles.caja}>
                <SCharts data={data[i]}  {...extraProps} type="Test" />
            </View>
            */}
            {/* <View style={styles.caja}></View>
            <View style={styles.caja}></View>
            <View style={styles.caja}></View>
            <View style={styles.caja}></View>
            <View style={styles.caja}></View>
            <View style={styles.caja}></View> */}

        </View>
    </ScrollView>
}
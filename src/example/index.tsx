import React, { useEffect } from "react"
import { ScrollView, View } from 'react-native'
import styles from "./styles"
import SCharts from ".."
import data1 from "./datat1"
import data2 from "./datat2"
import data3 from "./datat3"

const data4 = {
    "ricky": {
        "lun": 17,
        "mar": 34,
        "mie": 51,

    },
    "ruddy": {
        "lun": 28,
        "mar": 12,
        "mie": 30,

    },
    "eduardo": {
        "lun": 38,
        "mar": 4,
        "mie": 30,

    }
};
import { SChartPropsType } from "../type"
const data = [data1, data2, data3, data4]
export default (props) => {
    let i = 3;
    let extraProps: SChartPropsType = {
        data: null,

        showValue: true,
        showLabel: true,
        showGuide: true,
        showControl: true,
        space: 0.2,
        strokeWidth: 1,
        textColor: "#fff",
        // showValue: false,
        // showLabel: false,
        // showGuide: false,
        // strokeWidth: 1,
        // space: 0.1,
        colors: ['#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fa5820', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff', '#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fd5800', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff', '#fd5800', '#ff358b', '#e0ffff', '#ff006e', '#fd5800', '#e0ffff', '#8cfffb', '#39ff14', '#ff006e', '#ff00ff']
    }
    return <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", }}>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Donut_gauge" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Line" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Pie" />
            </View>

            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Bar" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Column" />
            </View>

            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Table" />
            </View>
            {/*
        
             <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Barras" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Column" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Line" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Wave" />
            </View>
            <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Donut" />
            </View>
           */}
            {/* <View style={styles.caja}>
                <SCharts   {...extraProps} data={data[i]} type="Test" />
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
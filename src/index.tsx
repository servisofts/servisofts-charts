import React from "react";
import { Text, View } from "react-native";
import { Data, SChartPropsType } from "./type";
import GraphicsTypes from "./Graphic";

import Example from "./example";
import FrecuencyTable from "./FrequencyTable";
export { Example };



export default class SCharts extends React.Component<SChartPropsType> {
    state = {
        viewBox: { width: 0, height: 0, x: 0, y: 0 }
    }
    onLayoutHandle = (e) => {
        const { width, height, x, y } = e.nativeEvent.layout
        this.setState({ viewBox: { width, height, x, y } })
    }


    render() {
        const { type, data, colors } = this.props;

        const table = new FrecuencyTable(data);
        if (colors) {
            table.intervals_color = colors;
        }
        const GRAPHIC_TYPE_CLASS = GraphicsTypes[type ?? "Barras"];
        return <View style={{
            width: "100%",
            flex: 1,
            ...this.props.style,
        }} onLayout={this.onLayoutHandle.bind(this)}>
            <GRAPHIC_TYPE_CLASS frecuencyTable={table} {...this.props} viewBox={this.state.viewBox} />
        </View >
    }
};

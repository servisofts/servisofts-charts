import React from "react";
import { Text, View } from "react-native";
import DebugState from "../src/components/DebugState";
import { Grid, GSvg } from "../src/Graphic";
import Barras from "../src/Graphic/Barras";
import { Data } from "../src/type";
import { viewBoxPadding } from "../src/Functions";

type SChartsProps = {
    data: Data,
}


export default class SCharts extends React.Component<SChartsProps> {
    state = {
        viewBox: { width: 0, height: 0, x: 0, y: 0 }
    }

    onLayoutHandle = (e) => {
        const { width, height, x, y } = e.nativeEvent.layout
        this.setState({ viewBox: { width, height, x, y } })
    }

    render() {
        const { data } = this.props;
        const vbc = viewBoxPadding(this.state.viewBox, {
            top: 8,
            right: 8,
            left: 30,
            bottom: 80,
        })
        return <View style={{
            width: "100%",
            flex: 1,
        }} onLayout={this.onLayoutHandle.bind(this)}>
            <DebugState state={this.state} />
            <GSvg viewBox={this.state.viewBox} >
                <Grid viewBox={this.state.viewBox} size={20} stroke="#666666" opacity={0.3} />
                <Barras data={data} viewBox={vbc} stroke="#ffffff" />
                {/* <Circle data={data} viewBox={vbc} stroke="#ffffff"/> */}
            </GSvg>
        </View >
    }
};

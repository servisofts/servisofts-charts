import React from "react";
import { Switch, Text, View } from "react-native";
import SCharts from ".";




export default class Controls extends React.Component<{ parent: SCharts }> {

    renderSwitch({ label, value, key }) {
        return <View style={{
            flexDirection: "row",
            padding: 0,
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Switch value={value} style={{
                // transform: [{ scale: 0.5 }]
            }} onValueChange={e => {
                this.props.parent.setState({ [key]: e })
            }} /><View style={{ width: 4 }} /><Text style={{ color: this.props.parent.props.textColor ?? "#000", fontSize: 10 }}>{label}</Text>
        </View>
    }
    render() {
        return <View style={{
            position: "absolute",
            right: 0,
            backgroundColor: "#ffffff66",
            borderRadius: 8,
            flexDirection: "row"
        }}>
            {this.renderSwitch({ label: "Values", value: this.props.parent.state.showValue, key: "showValue" })}
            {this.renderSwitch({ label: "Label", value: this.props.parent.state.showLabel, key: "showLabel" })}
            {this.renderSwitch({ label: "Guide", value: this.props.parent.state.showGuide, key: "showGuide" })}
        </View>
    }
}
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Style = StyleSheet.create({
    container: {
        width: 200,
        height: 300,
        backgroundColor: "#66666666",
        position: "absolute",
        top: 8,
        right: 8,
        borderRadius: 8,
        padding: 4,
        overflow: "hidden",
    },
    text: {
        color: "#ffff",
        fontSize: 12,
        fontWeight: "bold"
    }
})
export default ({ state }) => {
    const [open, setOpen] = React.useState(false);
    if (open) {
        return <TouchableOpacity style={Style.container} onPress={() => setOpen(false)}>
            <Text style={Style.text}>{JSON.stringify(state, (k, v) => v, "\t")}</Text>
        </TouchableOpacity>
    }
    return <TouchableOpacity style={[Style.container, { height: 22, alignItems: "center" }]} onPress={() => setOpen(true)}>
        <Text style={Style.text}>{"DEBUG STATE"}</Text>
    </TouchableOpacity>
}
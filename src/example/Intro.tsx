import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from "./styles"
import { Options } from "../SCharts"

const Option = ({ type, onPress }) => {
    return <TouchableOpacity style={{ borderWidth: 1, height: 30, padding: 4, minWidth: 100, justifyContent: "center", alignItems: "center" }} onPress={onPress}>
        <Text style={styles.text}>{type}</Text>
    </TouchableOpacity>
}


export default (props) => {
    const [type, setType] = useState("bar");
    const handleOnPress = (t: string) => {
        setType(t)
    }
    return <View style={styles.container}>
        <Text style={styles.text_h1}>SERVISOFTS-CHARTS</Text>
        <Text style={styles.text_h2}>Que es Servisofts Charts?</Text>
        <Text style={styles.text}>Servisofts charts es una libreria para la creacion de graficos.</Text>
        <Text style={styles.text_h2}>Types</Text>
        <View>
            <FlatList
                horizontal
                data={Object.keys(Options)}
                renderItem={p => <Option type={p.item} onPress={handleOnPress.bind(this, p.item)} />} />

        </View>
        <Text style={styles.text}>{type}</Text>
    </View>
}
import React from "react"
import { StyleSheet } from 'react-native'

const theme = {
    color: {
        primary: "#ffffff",
        secondary: "#000000",
        text: "#ffffff",
    }
}
export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.color.secondary
    },
    text: {
        color: theme.color.text,
        fontSize: 14,
    },
    text_h1: {
        color: theme.color.text,
        fontSize: 22,
        fontWeight:"bold"
    },
    text_h2: {
        color: theme.color.text,
        fontSize: 20,
        fontWeight:"bold"
    },
    text_h3: {
        color: theme.color.text,
        fontSize: 18,
        fontWeight:"bold"
    },
    text_h4: {
        color: theme.color.text,
        fontSize: 16,
        fontWeight:"bold"
    },
    text_h5: {
        color: theme.color.text,
        fontSize: 14,
        fontWeight:"bold"
    },

})
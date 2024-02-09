import React, { useEffect } from "react"
import { View } from 'react-native'
import styles from "./styles"
import FrecuencyTable from "../Model/FrequencyTable"
import { Data } from "../type"
import FrequencyDistributionTable from "../components/FrequencyDistributionTable"

const data: Data = {
    "2023-01-01": 10,
    "2023-01-02": 20,
    "2023-01-03": 30,
    "2023-01-04": 40,
    "2023-01-05": 50,
    "2023-01-06": 29,
    "2023-01-07": 18,
}
export default (props) => {
    useEffect(() => {
        let table = new FrecuencyTable(data);
        table.print();
    }, [])
    return <View style={styles.container}>
        <FrequencyDistributionTable data={data} />
    </View>
}
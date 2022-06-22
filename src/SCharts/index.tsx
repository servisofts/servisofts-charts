import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Svg, Circle } from 'react-native-svg';
type SChartsProps = {
}
export default class SCharts extends Component<SChartsProps> {
    props;
    constructor(props) {
        super(props);
    }
    render() {
        const width = 20;
        const strokeWidth = 10;
        const scale = width - strokeWidth;
        const grados = 20;
        const percent = 100-((grados*100)/360)
        return (
            <Svg height="50%" width="50%" viewBox={`0 0 ${width} ${width}`} >
                <Circle cx={width / 2} cy={width / 2} r={scale / 2} stroke="#000" fill="transparent" strokeWidth={strokeWidth}
                />
                <Circle cx={width / 2} cy={width / 2} r={scale / 2} stroke="#fff" fill="transparent" strokeWidth={strokeWidth}
                    strokeDasharray={scale * Math.PI}
                    strokeDashoffset={(scale * ((percent / 100) *Math.PI))}
                />
            </Svg>
        )
    }
}

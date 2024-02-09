import React, { Component } from 'react'
import { View } from 'react-native'
import { SChartsPropsType } from './type';
import Options from './options';




export default class SCharts extends Component<SChartsPropsType> {
    static defaultProps: SChartsPropsType = {
        type: null,
        data: null,
        viewBox: { width: 768, height: 768 },
        config: {
            space: 0
        },
        style: {

        }
    }

    state = {
        viewBox: this.props.viewBox
    }
    render() {
        const ITEM: any = Options[this.props.type];
        return <View style={{ width: "100%", flex: 1 }}
            onLayout={e => this.setState({ viewBox: { width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height } })}>
            <ITEM {...this.props} config={{ ...this.props.config }} viewBox={this.state.viewBox} />
        </View>

        return
    }
}

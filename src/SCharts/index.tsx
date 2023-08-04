import React, { Component } from 'react'
import { SChartsPropsType } from './type';

import barras_horizontal from "./options/barras_horizontal"
import barras_verticales from "./options/barras_verticales"
import * as bar from "./options/bar"
import * as pie from "./options/pie"
import * as donut from "./options/donut"

export const Options = {
    ...bar,
    ...pie,
    ...donut,
    barras_horizontal,
    barras_verticales
}

export default class SCharts extends Component<SChartsPropsType> {
    static defaultProps: SChartsPropsType = {
        type: null,
        data: null,
        config: {
            viewBox: { width: 768, height: 768 }
        },
        style: {

        }
    }
    render() {
        const ITEM = Options[this.props.type];
        return <ITEM {...this.props} />
    }
}

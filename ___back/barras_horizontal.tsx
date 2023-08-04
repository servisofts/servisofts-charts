import React, { Component } from 'react'
import { STheme } from 'servisofts-component';
import { Svg, Circle, Text, Rect } from 'react-native-svg';
import * as Func from '../Functions';

import { OptionsType, SChartConfig } from '../type';

export default class index extends Component<OptionsType> {
    static defaultProps: OptionsType = {
        data: null,
        strokeWidth: 1,
    }
    props: OptionsType;

    constructor(props) {
        super(props);
    }
    render() {
        const width = 250;
        const strokeWidth = width / 2;
        const scale = width - strokeWidth;


        const render_gr = () => {
            var conf: SChartConfig = {
                separacion: 10,
                grosor: 30,
                endSpace: 45,
                textColor: STheme.color.text,
                fontSize: 12,
                ...this.props.config ?? {}
            }
            if (!this.props.data) return null;
            const max = Func.calcular_maximo(this.props.data)
            var arr = this.props.data.sort((a, b) => b.val - a.val);

            return arr.map((obj, i) => {
                let color = obj.color ?? Func.color_random();
                let porcent: number = Func.calcular_procentaje({ val: obj.val, max: max })
                let y = ((i * (conf.separacion + conf.grosor)) + conf.separacion);
                return <>
                    <Rect
                        x={-conf.endSpace}
                        y={y}
                        width={Func.number_to_porcent_string(100 * porcent)}
                        height={conf.grosor}
                        fill={color}
                        ry={4}
                        {...Func.create_onPress(() => this.props.onSelect ? this.props.onSelect(obj) : null)}
                    />
                    <Text fill={conf.textColor} fontSize={conf.fontSize} fontWeight="bold"
                        font-family="Arial"
                        y={y + (conf.grosor / 2) + (conf.fontSize / 3)}
                        x={2}
                        textAnchor={'start'}
                    >{obj.label ?? obj.val}</Text>
                    <Text fill={conf.textColor} fontSize={conf.fontSize} fontWeight="bold"
                        font-family="Arial"
                        textAnchor='start'
                        y={y + (conf.grosor / 2) + (conf.fontSize / 3)}
                        x={Func.number_to_porcent_string(100 * porcent)}
                        translateX={(-conf.endSpace + 2)}
                    >{obj.info ?? Func.number_to_porcent_string(100 * porcent)}</Text>
                </>
            })

        }
        return (
            <Svg height="100%" width="100%" >
                {render_gr()}
            </Svg>
        )
    }
}

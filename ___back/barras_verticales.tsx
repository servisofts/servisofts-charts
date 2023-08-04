import React, { Component } from 'react'
import { STheme } from 'servisofts-component';
import { Svg, Circle, Text, Rect } from 'react-native-svg';
import * as Func from '../Functions';
import { DataPropsType, SChartConfig, OptionsType } from '../type';

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
                endSpace: 30,
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
                let x = ((i * (conf.separacion + conf.grosor)) + conf.separacion);
                return <>
                    <Rect
                        x={x}
                        y={-conf.endSpace}
                        width={conf.grosor}
                        height={Func.number_to_porcent_string(100 * porcent)}
                        fill={color}
                        ry={4}
                        {...Func.create_onPress(() => this.props.onSelect ? this.props.onSelect(obj) : null)}
                    // onPress={!this.props.onSelect ? null : () => this.props.onSelect(obj)}
                    />
                    <Text fill={conf.textColor} fontSize={conf.fontSize} fontWeight="bold"
                        font-family="Arial"
                        x={x}
                        y={conf.fontSize}
                        transform={`rotate(90 ${x} ${conf.fontSize}) translate(${-conf.fontSize+2} ${-(conf.grosor / 2) + (conf.fontSize / 2)})`}
                        // translateY={conf.grosor}
                        // translateX={12}
                        textAnchor={"start"}
                    >{obj?.label ?? obj.val}</Text>
                    <Text fill={conf.textColor} fontSize={conf.fontSize} fontWeight="bold"
                        font-family="Arial"
                        textAnchor='middle'
                        x={x + (conf.grosor / 2)}
                        y={Func.number_to_porcent_string(100)}
                        translateY={(-conf.endSpace + conf.fontSize)}
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

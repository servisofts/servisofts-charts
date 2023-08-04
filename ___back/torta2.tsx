import React, { Component } from 'react'
import { STheme } from 'servisofts-component';
import { Svg, Circle, Text } from 'react-native-svg';
import * as Func from '../Functions';
import { DataPropsType, OptionsType } from '../type';



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


        const render_circles = () => {
            if (!this.props.data) return null;
            const max = Func.sum(this.props.data)
            var arr = this.props.data.sort((a, b) => b.val - a.val);
            var actual = 0;
            console.log(arr);
            return arr.map((obj, i) => {
                let porcent: number = Func.calcular_procentaje({ val: obj.val, max: max })
                if (arr[i - 1]) {
                    actual += 360 * (Func.calcular_procentaje({ val: arr[i - 1].val, max: max }))
                }
                var porcent_text = actual + ((porcent * 360) / 2);
                var txtDir = (porcent_text > 90 && porcent_text < 270) ? -1 : 1;
                return <>
                    <Circle
                        cx={width / 2} cy={width / 2}
                        r={(scale - this.props.strokeWidth) / 2}
                        stroke={obj.color ?? Func.color_random()}
                        fill="transparent"
                        strokeWidth={strokeWidth - this.props.strokeWidth}
                        strokeDasharray={scale * Math.PI}
                        strokeDashoffset={(scale * Func.calcular_grados_to_strokeDashoffset(360 * (porcent)))}
                        transform={`rotate(${actual} ${strokeWidth} ${strokeWidth})`}
                        {...Func.create_onPress(() => this.props.onSelect ? this.props.onSelect(obj) : null)}
                    />
                    <Text
                        fill={STheme.color.text}
                        fontSize="16"
                        fontWeight="bold"
                        font-family="Arial"
                        alignmentBaseline={"central"}
                        textAnchor="middle"
                        transform={`scale(${txtDir},${txtDir}) rotate(${porcent_text},${strokeWidth * txtDir},${strokeWidth * txtDir})`}
                        x={(85 * txtDir) + "%"} y={(50 * txtDir) + "%"}
                    >
                        {obj.info ?? (((porcent * 100)).toFixed(0) + "%")}
                    </Text>
                </>
            })

        }
        return (
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${width}`} >
                {render_circles()}
            </Svg>
        )
    }
}

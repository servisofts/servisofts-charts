import React, { Component } from 'react'
import { Svg, Rect, Path } from 'react-native-svg';
import * as Func from '../../Functions';
import { OptionsType } from '../../type';

export default class index extends Component<OptionsType> {
    static defaultProps: OptionsType = {
        type: null,
        data: null,
    }
    props: OptionsType;

    constructor(props) {
        super(props);
    }

    render_data({ width, height }) {
        if (!this.props.data) return null;
        var arr = Func.simplifyObjectValue(this.props.data);
        const max = Func.calcular_maximo(this.props.data)
        const space = this.props.config.space / 2
        const separacion = ((width / arr.length) * space) + ((this.props.style.strokeWidth ?? 0))
        const grosor = ((width - (separacion * arr.length)) / arr.length)
        const radius = 10;
        return arr.map((obj, i) => {
            if (!obj.color) obj.color = Func.color_random();
            let porcent: number = Func.calcular_procentaje({ val: obj.val, max: max })
            let x = ((i * (separacion + grosor)) + separacion / 2);
            const strokeWidth = obj.style?.strokeWidth ?? (this.props?.style?.strokeWidth ?? 0)
            return <Rect
                x={x}
                y={height - ((height) * porcent) + (strokeWidth / 2)}
                width={grosor}
                height={((height) * porcent) + radius}
                fill={obj.color}
                stroke={obj.color}
                ry={radius}
                {...Func.create_onPress(() => this.props.onSelect ? this.props.onSelect(obj) : null)}
                {...this.props.style}
                {...obj.style}
            />
        })
    }
    render_rules() {
        const { width, height } = this.props.viewBox;
        const cantLines = 16;
        return <>
            {new Array(cantLines).fill(1).map((o, i) => <Path d={`M 0 ${i * (height / cantLines)} L ${width} ${i * (height / cantLines)}`} stroke={"#666"} />)}
            {new Array(this.props.data.length + 1).fill(1).map((o, i) => <Path d={`M ${i * ((width) / this.props.data.length)} 0 L ${i * ((width) / this.props.data.length)} ${height}`} stroke={"#666"} />)}
        </>
    }
    render() {
        const { width, height } = this.props.viewBox;
        return (
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
                {this.render_rules()}
                {this.render_data({ width: width, height: height })}
            </Svg>
        )
    }
}

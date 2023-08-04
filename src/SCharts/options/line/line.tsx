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



    render_line() {
        const { width, height } = this.props.viewBox;
        const arr = Func.simplifyObjectValue(this.props.data);
        const max = Func.calcular_maximo(arr);
        const separacion = ((width / arr.length) * 0.2) + ((this.props.style.strokeWidth ?? 0))
        const grosor = ((width - (separacion * arr.length)) / arr.length)
        let last = { x: 0, y: height }
        return arr.map((obj, i) => {
            if (!obj.color) obj.color = Func.color_random();
            let porcent: number = Func.calcular_procentaje({ val: obj.val, max: max })
            const strokeWidth = obj.style?.strokeWidth ?? (this.props?.style?.strokeWidth ?? 0)
            let x = ((i * (separacion + grosor)) + separacion / 2) + (grosor / 2);
            let y = height - ((height) * porcent) + (strokeWidth / 2)
            var d = [
                "M", last.x, last.y,
                "L", x, y,
            ].join(" ");
            const item = <Path
                d={d}
                // fill={obj.color}
                stroke={obj.color}
                {...this.props.style}
                {...obj.style}
            />
            last = { x: x, y: y };
            return item;
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
        return <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
            {/* {this.render_rules()} */}
            {this.render_line()}
        </Svg>
    }
}

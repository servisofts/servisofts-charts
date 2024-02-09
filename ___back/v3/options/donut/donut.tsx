import React, { Component } from 'react'
import { STheme } from 'servisofts-component';
import { Svg, Circle, Text, Path } from 'react-native-svg';
import * as Func from '../../Functions';
import { DataPropsType, OptionsType } from '../../type';



export default class index extends Component<OptionsType> {
    static defaultProps: OptionsType = {
        type: null,
        data: null,
    }
    props: OptionsType;

    constructor(props) {
        super(props);
    }
    render() {
        const width = 768;
        const center = width / 2;
        const strokeWidth = this.props?.style?.strokeWidth ?? 0;
        const scale = center - (strokeWidth / 2);


        const render_circles = () => {
            if (!this.props.data) return null;
            var arr = Func.simplifyObjectValue(this.props.data);
            const sum = Func.sum(arr)
            var currentAngle = 0;
            // const arr = this.props.data.sort((a, b) => b.val - a.val);
            return arr.map(obj => {
                if (!obj.color) obj.color = Func.color_random();
                var angle = 0;
                if (typeof obj.val == "number") {
                    angle = (((obj.val / sum) * 100) / 100) * 360;
                } else {

                }
                const p = <Path d={Func.describeDonutPath(center, center, scale, currentAngle, currentAngle + angle, 100)}
                    fill={obj.color}
                    stroke={obj.color}
                    {...this.props.style}
                    {...obj.style}
                />
                currentAngle += angle;
                return p;
            })
        }
        return (
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${width}`} >
                {render_circles()}
            </Svg>
        )
    }
}

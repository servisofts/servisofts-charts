import React, { Component } from 'react'
import { STheme } from 'servisofts-component';
import { Svg, Circle, Text, Path } from 'react-native-svg';
import * as Func from '../Functions';
import { DataPropsType, OptionsType } from '../type';



export default class index extends Component<OptionsType> {
    static defaultProps: OptionsType = {
        data: null,
    }
    props: OptionsType;

    constructor(props) {
        super(props);
    }
    render() {
        const width = 250;
        const center = width / 2;
        const strokeWidth = this.props?.style?.strokeWidth ?? center;
        const scale = center - (strokeWidth / 2);


        const render_circles = () => {
            if (!this.props.data) return null;
            const sum = Func.sum(this.props.data)
            var currentAngle = 0;
            const arr = this.props.data.sort((a, b) => b.val - a.val);
            return arr.map(obj => {
                var angle = (((obj.val / sum) * 100) / 100) * 360;
                const p = <Path d={Func.describeArc(center, center, scale, currentAngle, currentAngle + angle)}
                    stroke={obj.color}
                    fill={"transparent"}
                    strokeWidth={strokeWidth}
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

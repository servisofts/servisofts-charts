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
        const radius = center - (strokeWidth / 2);



        const render_circles = () => {
            if (!this.props.data) return null;
            var arr = Func.simplifyObjectValue(this.props.data);
            const max = Func.max(arr)
            var currentAngle = 0;
            const separacion = ((width / (arr.length)) * 0.05) + ((this.props.style.strokeWidth ?? 0))
            // const grosor = radius / this.props.data.length
            const grosor = ((radius - (separacion * arr.length)) / (arr.length + 1.2))
            // const arr = this.props.data.sort((a, b) => b.val - a.val);
            return arr.map((obj, i) => {
                if (!obj.color) obj.color = Func.color_random();
                var angle = 0;
                let x = (((i + 1) * (separacion + grosor)) + separacion / 2);
                const nv = obj.val as number;
                angle = ((((nv * 0.75) / max) * 100) / 100) * 360;
                const p = <Path d={Func.describeDonutPath(center, center, grosor + x, 0, angle, grosor)}
                    fill={obj.color}
                    stroke={obj.color}
                    {...this.props.style}
                    {...obj.style}
                />
                const pBack = <Path d={Func.describeDonutPath(center, center, grosor + x, 0, 360 * 0.75, grosor)}
                    fill={obj.color}
                    opacity={0.1}
                />
                currentAngle += angle;
                return <>
                    {pBack}
                    {p}
                </>;
            })
        }
        return (
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${width}`} >
                {render_circles()}
            </Svg >
        )
    }
}

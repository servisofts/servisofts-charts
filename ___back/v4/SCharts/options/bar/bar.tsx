import React, { Children, Component } from 'react'
import { Svg, Rect, Path } from 'react-native-svg';
import * as Func from '../../Functions';
import { OptionsType } from '../../type';
import { SSvg, Border, Grid } from '../../components/SSvg';


export default ({ viewBox, data }: OptionsType) => {


    const dataSimple = Func.simplify_data(data);
    const distributionTable = Func.frequencyTable(dataSimple)

    console.log(distributionTable)
    
    const space = 40;
    const GridViewBox = {
        width: viewBox.width - space,
        height: viewBox.height - space,
        x: space,
        y: 0
    }
    return <Svg height="100%" width="100%" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} >
        {/* <Border viewBox={viewBox} /> */}
        {/* <Grid size={50} viewBox={GridViewBox} /> */}
    </Svg>
}
/*
export default class index extends Component<OptionsType> {
    static defaultProps: OptionsType = {
        type: null,
        data: null,
    }
    props: OptionsType;

    constructor(props) {
        super(props);
    }

    render_data() {
        const { width, height } = this.props.viewBox;
        if (!this.props.data) return null;
        const data = Func.simplify_data(this.props.data);
        // var arr = Func.simplifyObjectValue(this.props.data);
        var arr = Object.values(data);
        const max = Func.max(data)
        const space = this.props.config.space / 2
        const separacion = ((width / arr.length) * space) + ((this.props.style.strokeWidth ?? 0))
        const grosor = ((width - (separacion * arr.length)) / arr.length)
        const radius = 0;
        const strokeWidth = this.props?.style?.strokeWidth ?? 0
        return arr.map((f, i) => {
            const color = Func.color_random();
            let porcent: number = Func.porcent(f, max)
            const x = ((i * (separacion + grosor)) + separacion / 2);
            const y = (height - ((height) * porcent) + (strokeWidth / 2))
            const w = grosor;
            const h = ((height) * porcent) + radius;
            return <Rect x={x} y={y}
                width={w} height={h}
                fill={color}
                stroke={color}
                ry={radius}
                {...this.props.style}
            />
        })
    }

    render() {
        const { width, height } = this.props.viewBox;
        return (
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} >
                {this.render_data()}
            </Svg>
        )
    }
}

*/
import React from 'react';


import icons from './icons/icons';


class Icon extends React.Component {
    constructor(props){
        super(props);
        this.icons = icons;
    }

    scaleIcon(){
        const arm = this.props.icon.arm;
        const factor = 0.0015*arm;
        return "scale(" + factor.toString() + ", " + factor.toString() + ")";
    }

    moveIcon(){
        const x = 0.66*this.props.icon.arm;
        const y = 0.20*this.props.icon.arm;
        return "translate(" + x.toString() + ", " + y.toString() + ")";
    }

    render() {
        const icon = this.icons[this.props.icon.name];
        const style = {fill: this.props.icon.fill};
        return (
            <a href={this.props.icon.link} >
            <g transform={this.moveIcon()}>
                <g transform={this.scaleIcon()}>
                    <path
                        d={icon} 
                        style={style}
                        />
                </g>
            </g>
            </a>
        );
    }
}

export default Icon;


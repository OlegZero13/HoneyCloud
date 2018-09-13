import React from 'react';


import Icon from './Icon.js';



class Hex extends React.Component {
    defineHexSize() {
        const S      = 0.1*Math.floor(0.1*this.props.hex.arm);
        const W      = 2*this.props.hex.arm;
        const H      = 2*this.props.hex.arm*Math.cos(Math.PI/6);
        
        const p0 = [0.5*this.props.hex.arm + S/Math.sqrt(3), S];
        const p1 = [W - 0.5*this.props.hex.arm - S/Math.sqrt(3), S];
        const p2 = [W - 2/Math.sqrt(3)*S, 0.5*H];
        const p3 = [W - 0.5*this.props.hex.arm - S/Math.sqrt(3), H - S];
        const p4 = [0.5*this.props.hex.arm + S/Math.sqrt(3), H - S];
        const p5 = [2/Math.sqrt(3)*S, 0.5*H];

        const pp = [p0, p1, p2, p3, p4, p5];
        return pp.join(',');
    }

    defineHex(){
        const border = 0.1*Math.floor(0.1*this.props.hex.arm);
        const pitchX = 3*this.props.hex.arm;
        const pitchY = this.props.hex.arm*Math.cos(Math.PI/6);
        const moveX  = parseInt(this.props.hex.nx, 10)*pitchX
                     + (this.props.hex.ny % 2)*1.5*this.props.hex.arm
                     + 0.25*this.props.hex.arm;
        const moveY  = parseInt(this.props.hex.ny, 10)*pitchY
                     + 0.25*this.props.hex.arm - 3.5*border;
        const move   = "translate(" + moveX.toString() + ", " + moveY.toString() + ")";
        const scale  = "scale(0.75, 0.75)";
        
        const id_poly = "hex-" + this.props.hex.nx + "-" + this.props.hex.ny;

        const style  = {
            hex:  {
                fill:   this.props.hex.background,
                stroke:     this.props.hex.stroke,
                strokeWidth: 0.1*this.props.hex.arm,
            },
            icon: {
                color:      this.props.hex.color,
            },
            iconBg: {
                textAlign:   "center",
            },
            text: {
                fill:      this.props.hex.color,
            }
        };

        const icon = {
            arm:    this.props.hex.arm,
            name:   this.props.hex.icon,
            link:   this.props.hex.link,
            fill:   this.props.hex.color,
        };

        let hex = (
            <g transform={move}>
              <g transform={scale}>
                <polygon
                    onClick={this.props.onCellSelect}
                    points={this.defineHexSize()}
                    style={style.hex}
                    id={id_poly} />
                <Icon icon={icon} />
                <text
                    style={style.text}
                    x={this.props.hex.arm}
                    y={1.3*this.props.hex.arm}
                    fontSize={0.2*this.props.hex.arm}
                    textAnchor="middle">
                    {this.props.hex.title}
                </text>
              </g>
            </g>
            );
        return hex;
    }

    render() {
        return (
            <g>
                {this.defineHex()}
            </g>
        );
    }
}

export default Hex;


import React from 'react';


class EmptyCell extends React.Component {
    defineCellSize() {
        const S      = 0.1*Math.floor(0.1*this.props.cell.arm);
        const W      = 2*this.props.cell.arm;
        const H      = 2*this.props.cell.arm*Math.cos(Math.PI/6);
        
        const p0 = [0.5*this.props.cell.arm + S/Math.sqrt(3), S];
        const p1 = [W - 0.5*this.props.cell.arm - S/Math.sqrt(3), S];
        const p2 = [W - 2/Math.sqrt(3)*S, 0.5*H];
        const p3 = [W - 0.5*this.props.cell.arm - S/Math.sqrt(3), H - S];
        const p4 = [0.5*this.props.cell.arm + S/Math.sqrt(3), H - S];
        const p5 = [2/Math.sqrt(3)*S, 0.5*H];

        const pp = [p0, p1, p2, p3, p4, p5];
        return pp.join(',');
    }

    defineEmptyCell(){
        const pitchX = 3*this.props.cell.arm;
        const pitchY = this.props.cell.arm*Math.cos(Math.PI/6);
        const moveX  = parseInt(this.props.cell.nx, 10)*pitchX
                     + (this.props.cell.ny % 2)*1.5*this.props.cell.arm;
        const moveY  = parseInt(this.props.cell.ny, 10)*pitchY;
        const move   = "translate(" + moveX.toString() + ", " + moveY.toString() + ")";
        
        const id_poly = "emptycell-" + this.props.cell.nx + "-" + this.props.cell.ny;
        const id_text = "emptytext-" + this.props.cell.nx + "-" + this.props.cell.ny;
        const style  = {
            on: {
                    fill: this.props.cell.gridColor,
            },
            off: {
                    fill: this.props.cell.background,
            }
        };

        let cell;
        if (this.props.cell.showGrid) {
        cell = (
            <g transform={move}>
                <polygon
                    onClick={this.props.onCellSelect}
                    points={this.defineCellSize()}
                    style={style.on}
                    id={id_poly} />
                <text
                    onClick={this.props.onCellSelect}
                    fill="darkgray"
                    textAnchor="middle"
                    x={this.props.cell.arm}
                    y={this.props.cell.arm}
                    id={id_text} >
                    [{this.props.cell.nx}, {this.props.cell.ny}]
                </text>
             </g>
             );
        } else {
        cell = (
            <g>
                <polygon
                    onClick={this.props.onCellSelect}
                    points={this.defineCellSize()}
                    style={style.off}
                    id={id_poly} />
            </g>
            );
        }
        return cell;
    }

    render() {
        return (
            <g>
                {this.defineEmptyCell()}
            </g>
        );
    }
}

export default EmptyCell;


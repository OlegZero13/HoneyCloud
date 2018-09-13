import React from 'react';


class Wall extends React.Component {
    defineWallPoints(){
        const x1 = 0.5*this.props.wall.arm;
        const x2 = x1 + this.props.wall.arm;
        const y1 = 0.0;
        const y2 = 0.0;
        const pp = [x1, y1, x2, y2];
        return "M" + pp.join(',');
    }

    translateWall(){
        const border = 0.1*Math.floor(0.1*this.props.wall.arm);
        const pitchX = 3*this.props.wall.arm;
        const pitchY = this.props.wall.arm*Math.cos(Math.PI/6);
        const moveX  = parseInt(this.props.wall.nx, 10)*pitchX
                     + (this.props.wall.ny % 2)*1.5*this.props.wall.arm;
        const moveY  = parseInt(this.props.wall.ny, 10)*pitchY
                     - 2.5*border;
        const move   = "translate(" + moveX.toString() + ", " + moveY.toString() + ")";
        return move;
    }

    rotateWall(){
        const x0 = this.props.wall.arm.toString();
        const y0 = (this.props.wall.arm*Math.cos(Math.PI/6)).toString();
        const deg = (parseInt(this.props.wall.side, 10) * 60).toString();
        return "rotate(" + deg + ", " + x0 + ", " + y0 + ")";
    }

    render() {
        const id = "wall-"
                 + this.props.wall.nx
                 + "-"
                 + this.props.wall.ny
                 + "-"
                 + this.props.wall.side;
        const wall = (
                <path
                    id={id}
                    onClick={this.props.onWallSelect}
                    strokeWidth={0.15*this.props.wall.arm}
                    strokeLinecap="round"
                    stroke={this.props.wall.color}
                    d={this.defineWallPoints()} />
                );
        return (
            <g transform={this.translateWall()} >
              <g transform={this.rotateWall()} >
                {wall}
              </g>
            </g>
        );
    }
}

export default Wall;


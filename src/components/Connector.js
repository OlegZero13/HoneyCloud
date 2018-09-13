import React from 'react';


class Connector extends React.Component {
    defineLinePoints(){
        const x1 = this.props.conn.arm;
        const x2 = this.props.conn.arm;
        const y1 = this.props.conn.arm*Math.cos(Math.PI/6);
        const y2 = -y1;
        return [x1, y1, x2, y2];
    }

    rotateConnector(){
        const points = this.defineLinePoints();
        const x0 = points[0].toString();
        const y0 = points[1].toString();
        const deg = (parseInt(this.props.conn.direction, 10) * 60).toString();
        return "rotate(" + deg + ", " + x0 + ", " + y0 + ")";
    }

    translateConnector(){
        const pitchX = 3.0*this.props.conn.arm;
        const pitchY = this.props.conn.arm*Math.cos(Math.PI/6);
        const moveX  = parseInt(this.props.conn.nx, 10)*pitchX
                     + (this.props.conn.ny % 2)*1.5*this.props.conn.arm;
        const moveY  = parseInt(this.props.conn.ny, 10)*pitchY;
        const move   = "translate(" + moveX.toString() + ", " + moveY.toString() + ")";
        return move;
    }

    defineArrowPoints(){
        const points = this.defineLinePoints();
        const x1 = points[0];
        const y2 = points[3];
        const arm = this.props.conn.arm;
        const stk = Math.floor(0.10*arm);
        const p0  = [x1 - stk, 0.03*y2 + 0.20*arm];
        const p1  = [x1 + stk, 0.03*y2 + 0.20*arm];
        const p2  = [x1, 0.03*y2 + 0.05*arm];
        const pp  = [p0, p1, p2];
        return pp.join(',');
    }

    render(){
        const style = {
            line: {
                fill:           this.props.conn.color,
                strokeWidth:    0.05*this.props.conn.arm,
                stroke:         this.props.conn.color,
            },
            arrow: {
                fill:           this.props.conn.color,
                strokeWidth:    0,
                stroke:         this.props.conn.color,
            }
        };
        const linePoints = this.defineLinePoints();
        const line = (
                <line 
                    x1={linePoints[0]}
                    y1={linePoints[1]}
                    x2={linePoints[2]}
                    y2={linePoints[3]}
                    style={style.line}
                    key="line" />
               );
        const arrowPoints = this.defineArrowPoints();
        const arrow = <polygon points={arrowPoints} style={style.arrow} key="arrow" />;

        let connector;
        if (this.props.conn.arrow) {
            connector = [line, arrow];
        } else {
            connector = [line];
        }
        return (
            <g transform={this.translateConnector()}>
              <g transform={this.rotateConnector()}>
                {connector}
              </g>
            </g>
        );
    }
}

export default Connector;


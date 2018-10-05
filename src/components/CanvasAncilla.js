import React from 'react';

import EmptyCell from './EmptyCell';
import Cell from './Cell';
import Hex from './Hex';
import Connector from './Connector';
import Wall from './Wall';


class CanvasAncilla extends React.Component {
    constructor(props){
        super(props);
        const canvasSize = this.defineCanvasAncillaSize();
        this.width  = canvasSize[0];
        this.height = canvasSize[1];
    }

    defineUnitSize(){
        let arm;
        if (this.props.canvas.globals.grid === 'XL') {
            arm = 160;
        } else if (this.props.canvas.globals.grid === 'L') {
            arm = 120;
        } else if (this.props.canvas.globals.grid === 'M') {
            arm = 90;
        } else if (this.props.canvas.globals.grid === 'S') {
            arm = 60;
        } else {
            arm = 40;
        }
        return arm;
    }

    defineAncillaLimits(){
        const cells = this.props.canvas.cells;
        const hexs  = this.props.canvas.hexs;
        const conns = this.props.canvas.conns;
        const walls = this.props.canvas.walls;
        let xmax = 0;
        let ymax = 0;
        let xmin = parseInt(this.props.canvas.globals.Nx, 10);
        let ymin = parseInt(this.props.canvas.globals.Ny, 10);

        if (cells.length > 0) {
            for (let c in cells) {
                const x = parseInt(cells[c].pos[0], 10);
                const y = parseInt(cells[c].pos[1], 10);
                xmax = (x >= xmax) ? x : xmax;
                xmin = (x <= xmin) ? x : xmin;
                ymax = (y >= ymax) ? y : ymax;
                ymin = (y <= ymin) ? y : ymin;
            }
        }
        if (hexs.length > 0) {
            for (let h in hexs) {
                const x = parseInt(hexs[h].pos[0], 10);
                const y = parseInt(hexs[h].pos[1], 10);
                xmax = (x >= xmax) ? x : xmax;
                xmin = (x <= xmin) ? x : xmin;
                ymax = (y >= ymax) ? y : ymax;
                ymin = (y <= ymin) ? y : ymin;
            }
        }
        if (conns.length > 0) {
            for (let c in conns) {
                const x = parseInt(conns[c].pos[0], 10);
                const y = parseInt(conns[c].pos[1], 10);
                xmax = (x >= xmax) ? x : xmax;
                xmin = (x <= xmin) ? x : xmin;
                ymax = (y >= ymax) ? y : ymax;
                ymin = (y <= ymin) ? y : ymin;
            }
        }
        if (walls.length > 0) {
            for (let w in walls) {
                const x = parseInt(walls[w].pos[0], 10);
                const y = parseInt(walls[w].pos[1], 10);
                xmax = (x >= xmax) ? x : xmax;
                xmin = (x <= xmin) ? x : xmin;
                ymax = (y >= ymax) ? y : ymax;
                ymin = (y <= ymin) ? y : ymin;
            }
        }
        return [xmin, xmax, ymin, ymax];
    }
    
    defineCanvasAncillaSize(){
        const limits = this.defineAncillaLimits();
        const arm       = this.defineUnitSize();
        const Nx        = limits[1] - limits[0] + 1;
        const Ny        = limits[3] - limits[2] + 1;
        const Dx        = Nx - 1;
        const Dy        = Ny - 1;
        const pitchX    = 3*arm;
        const pitchY    = arm*Math.cos(Math.PI/6);
        const width     = Nx*pitchX 
                        - 1.5*arm*(Dx === 0 && Dy === 0 && (Ny + 0) % 2)
                        + (Ny % 2)*0.5*arm
                        + ((1 + Ny) % 2)*Math.sin(Math.PI/6)*arm
                        + 0.20*arm*Math.cos(Math.PI/6);
        const height    = Ny*pitchY + arm
                        + 0.05*arm;
        return [width, height];
    }

    defineGrid(){
        const arm = this.defineUnitSize();
        let emptycells = [];
        for (let nx = 0; nx < parseInt(this.props.canvas.globals.Nx, 10); nx++) {
            for (let ny = 0; ny < parseInt(this.props.canvas.globals.Ny, 10); ny++) {
                let cell = {
                    nx:         nx.toString(),
                    ny:         ny.toString(),
                    arm:        arm,
                    showGrid:   this.props.canvas.globals.showGrid,
                    gridColor:  this.props.canvas.globals.gridColor,
                    background: this.props.canvas.globals.background,
                };
                let key = nx.toString() + "-" + ny.toString();
                emptycells.push(<EmptyCell 
                                    cell={cell} 
                                    key={key} 
                                    onCellSelect={this.props.onCellSelect}
                                    />);
            }
        }
        return emptycells;
    }

    drawCells(){
        const arm = this.defineUnitSize();
        const cells = [];
        for (let c in this.props.canvas.cells) {
            let cell = {
                nx:         this.props.canvas.cells[c].pos[0],
                ny:         this.props.canvas.cells[c].pos[1],
                arm:        arm,
                background: this.props.canvas.cells[c].background,
            };
            let key = this.props.canvas.cells[c].pos[0] 
                    + "-" 
                    + this.props.canvas.cells[c].pos[1];
            cells.push(<Cell 
                            cell={cell} 
                            key={key}
                            onCellSelect={this.props.onCellSelect}
                            />)
        }
        return cells;
    }

    drawHexs(){
        const arm = this.defineUnitSize();
        const hexs = [];
        for (let h in this.props.canvas.hexs) {
            let hex = {
                nx:         this.props.canvas.hexs[h].pos[0],
                ny:         this.props.canvas.hexs[h].pos[1],
                arm:        arm,
                background: this.props.canvas.hexs[h].background,
                stroke:     this.props.canvas.hexs[h].stroke,
                color:      this.props.canvas.hexs[h].color,
                title:      this.props.canvas.hexs[h].title,
                icon:       this.props.canvas.hexs[h].icon,
                link:       this.props.canvas.hexs[h].link,
            };
            let key = this.props.canvas.hexs[h].pos[0]
                    + "-"
                    + this.props.canvas.hexs[h].pos[1];
            hexs.push(<Hex
                            hex={hex}
                            key={key}
                            onCellSelect={this.props.onCellSelect}
                            />)
        }
        return hexs;
    }

    drawConnectors(){
        const arm = this.defineUnitSize();
        const conns = [];
        for (let c in this.props.canvas.conns) {
            let conn = {
                nx:         this.props.canvas.conns[c].pos[0],
                ny:         this.props.canvas.conns[c].pos[1],
                arm:        arm,
                direction:  this.props.canvas.conns[c].direction,
                color:      this.props.canvas.conns[c].color,
                arrow:      this.props.canvas.conns[c].arrow,
            };
            let key = this.props.canvas.conns[c].pos[0]
                    + "-"
                    + this.props.canvas.conns[c].pos[1]
                    + "-"
                    + this.props.canvas.conns[c].direction;
            conns.push(<Connector
                            conn={conn}
                            key={key}
                            />)
        }
        return conns;
    }

    drawWalls(){
        const arm = this.defineUnitSize();
        const walls = [];
        for (let w in this.props.canvas.walls) {
            let wall = {
                nx:         this.props.canvas.walls[w].pos[0],
                ny:         this.props.canvas.walls[w].pos[1],
                arm:        arm,
                side:       this.props.canvas.walls[w].side,
                color:      this.props.canvas.walls[w].color,
            };
            let key = this.props.canvas.walls[w].pos[0]
                    + "-"
                    + this.props.canvas.walls[w].pos[1]
                    + "-"
                    + this.props.canvas.walls[w].side;
            walls.push(<Wall
                            onWallSelect={this.props.onWallSelect}
                            wall={wall}
                            key={key}
                            />)
        }
        return walls;
    }

    repositionCanvasAncilla() {
        const limits = this.defineAncillaLimits();
        const arm = this.defineUnitSize();
        const Nx = limits[0];
        const Ny = limits[2];
        const Dy = limits[3] - limits[2];
        const Dx = limits[1] - limits[0];
        const pitchX    = 3*arm;
        const pitchY    = arm*Math.cos(Math.PI/6);
        const dx = 0.10*arm*Math.cos(Math.PI/6)
                 - Nx*pitchX
                 - 1.5*arm*(Dx === 0 && ((Dy + 1) % 2) && (Ny + 0) % 2);
        const dy = 0.10*arm - Ny*pitchY;
        return "translate(" + dx.toString() + ", " + dy.toString() + ")";
    }



    render() {
        this.defineAncillaLimits();
        const style = {
            fill:   this.props.canvas.globals.background,
        };
        const canvasSize = this.defineCanvasAncillaSize();
        const width  = canvasSize[0];
        const height = canvasSize[1];
        const emptycells = this.defineGrid();
        const cells      = this.drawCells();
        const hexs       = this.drawHexs();
        const connectors = this.drawConnectors();
        const walls      = this.drawWalls();
        const canvasTranslate = this.repositionCanvasAncilla();
        return (
            <div className="canvas">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width={width} 
                    height={height} 
                    id="canvas-ancilla">
                <rect 
                    width={width} 
                    height={height} 
                    style={style} />
                <g transform={canvasTranslate} >
                    {emptycells}
                    {cells}
                    {walls}
                    {connectors}
                    {hexs}
                </g>
                </svg>
            </div>
        );
    }
}

export default CanvasAncilla;


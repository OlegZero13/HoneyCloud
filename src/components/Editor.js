import React from 'react';


import GlobalControl from './controls/GlobalControl';
import CellControl from './controls/CellControl';
import HexControl from './controls/HexControl';
import ConnectorControl from './controls/ConnectorControl';
import WallControl from './controls/WallControl';
import Exporter from './controls/Exporter';
import FooterAbout from './controls/FooterAbout';
import Canvas from './Canvas';

import logo from '../HoneyCloud.png';


class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: {
                Nx:         "24",
                Ny:         "32",
                grid:       "S",
                showGrid:   true,
                background: "#FFFFFF",
                gridColor:  "#EEEEEE",
                cells:      [],
                hexs:       [],
                conns:      [],
                walls:      [],
            },
            control: {
                nx:         "0",
                ny:         "0",
                background: "#777777",
                code:       "",
                filename:   "Honey-Cloud",
                hex: {
                    background: "#DDDDDD",
                    stroke:     "#000000",
                    color:      "#000000",
                    title:      "new",
                    icon:       "question",
                    link:       "#",
                },
                conn: {
                    direction:  "0",
                    color:      "#BB0000",
                    arrow:      true,
                },
                wall: {
                    side:       "0",
                    color:      "#333333",
                },
            },
        };
        this.onLoad         = this.onLoad.bind(this);
        this.onSave         = this.onSave.bind(this);
        this.onGlobalChange = this.onGlobalChange.bind(this);
        this.onCellChange   = this.onCellChange.bind(this);
        this.onCellCreate   = this.onCellCreate.bind(this);
        this.onCellRemove   = this.onCellRemove.bind(this);
        this.onCellSelect   = this.onCellSelect.bind(this);
        this.onConnectorCreate   = this.onConnectorCreate.bind(this);
        this.onConnectorClear    = this.onConnectorClear.bind(this);
        this.onConnectorChange   = this.onConnectorChange.bind(this);
        this.onWallCreate   = this.onWallCreate.bind(this);
        this.onWallClear    = this.onWallClear.bind(this);
        this.onWallChange   = this.onWallChange.bind(this);
        this.onWallSelect   = this.onWallSelect.bind(this);
    }

    onLoad(e){
        console.log("onload");
        const aux = document.getElementById("loader");
        const json = JSON.parse(aux.innerHTML);
        this.setState({canvas: json});
    }

    onSave(e){
        const canvas = this.state.canvas;
        const json = JSON.stringify(canvas);
        let filename;
        if (this.state.control.filename === "" || this.state.control.filename == null) {
            filename = "HoneyCloud.txt";
        } else {
            filename = this.state.control.filename + ".txt";
        }
        let evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true,
        });
        let a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,'+ encodeURIComponent(json));
        a.setAttribute('download', filename);
        a.dispatchEvent(evt);
    }

    onGlobalChange(e){
        let canvas = this.state.canvas;
        if (e.target.name === 'Nx') {
            canvas.Nx = e.target.value;
        } else if (e.target.name === 'Ny') {
            canvas.Ny = e.target.value;
        } else if (e.target.name === 'grid') {
            canvas.grid = e.target.value;
        } else if (e.target.name === 'showGrid') {
            canvas.showGrid = e.target.checked;
        } else if (e.target.name === 'background') {
            canvas.background = e.target.value;
        } else if (e.target.name === 'gridColor') {
            canvas.gridColor = e.target.value;
        }
        this.setState({canvas: canvas});
    }

    onCellCreate(e) {
        const control = this.state.control;
        let canvas = this.state.canvas;
        let index;
        for (let c in canvas.cells) {
            if ((canvas.cells[c].pos[0] === control.nx)
             && (canvas.cells[c].pos[1] === control.ny)) {
                index = c;
                break;
            }
        }
        if (index != null) {
            return;
        } else {
            const cell = {
                pos:        [control.nx, control.ny],
                background: control.background,
            };
            const hex = {
                pos:        [control.nx, control.ny],
                background: control.hex.background,
                stroke:     control.hex.stroke,
                color:      control.hex.color,
                title:      control.hex.title,
                icon:       control.hex.icon,
                link:       control.hex.link,
            };
            canvas.cells.push(cell);
            canvas.hexs.push(hex);
            this.setState({canvas: canvas});
        }
    }

    onConnectorCreate(e) {
        let canvas = this.state.canvas;
        let control = this.state.control;
        let index = null;
        for (let c in canvas.conns) {
            if ((canvas.conns[c].pos[0] === control.nx)
             && (canvas.conns[c].pos[1] === control.ny)
             && (canvas.conns[c].direction === control.conn.direction)) {
                index = c;
                break;
            }
        }
        if (index != null) {
            return;
        } else {
            const conn = {
                pos:        [control.nx, control.ny],
                direction:  control.conn.direction,
                color:      control.conn.color,
                arrow:      control.conn.arrow,
            };
            control.conn.direction = ((parseInt(control.conn.direction, 10) + 1) 
                                   % 6).toString();
            canvas.conns.push(conn);
            this.setState({
                canvas: canvas,
                control: control,
            });
        }
    }

    onWallCreate(e) {
        let canvas = this.state.canvas;
        let control = this.state.control;
        let index = null;
        for (let w in canvas.walls) {
            if ((canvas.walls[w].pos[0] === control.nx)
             && (canvas.walls[w].pos[1] === control.ny)
             && (canvas.walls[w].side === control.wall.side)) {
                index = w;
                break;
            }
        }
        if (index != null) {
            return;
        } else {
            const wall = {
                pos:        [control.nx, control.ny],
                side:       control.wall.side,
                color:      control.wall.color,
            };
            control.wall.side = ((parseInt(control.wall.side, 10) + 1)
                              % 6).toString();
            canvas.walls.push(wall);
            this.setState({
                canvas: canvas,
                control: control,
            });
        }
    }

    onCellRemove(e) {
        const control = this.state.control;
        let canvas = this.state.canvas;
        let index;
        for (let c in canvas.cells) {
            if ((canvas.cells[c].pos[0] === control.nx)
             && (canvas.cells[c].pos[1] === control.ny)) {
                index = c;
                break;
            }
        }
        if (index == null) {
            return;
        } else {
            canvas.cells.splice(index, 1);
            canvas.hexs.splice(index, 1);
            this.setState({canvas: canvas});
        }
    }

    onConnectorClear(e) {
        const control = this.state.control;
        let canvas = this.state.canvas;
        let index = null;
        for (let c in canvas.conns) {
            if ((canvas.conns[c].pos[0] === control.nx)
             && (canvas.conns[c].pos[1] === control.ny)
             && (canvas.conns[c].direction === control.conn.direction)) {
                 index = c;
                 break;
            }
        }
        if (index == null) {
            return;
        } else {
            control.conn.direction = ((parseInt(control.conn.direction, 10) + 1) 
                                   % 6).toString();
            canvas.conns.splice(parseInt(index, 10), 1);
        }
        this.setState({
            canvas: canvas,
            control: control,
        });
    }

    onWallClear(e) {
        const control = this.state.control;
        let canvas = this.state.canvas;
        let index = null;
        for (let w in canvas.walls) {
            if ((canvas.walls[w].pos[0] === control.nx)
             && (canvas.walls[w].pos[1] === control.ny)
             && (canvas.walls[w].side === control.wall.side)) {
                index = w;
                break;
            }
        }
        if (index == null) {
            return;
        } else {
            control.wall.side = ((parseInt(control.wall.side, 10) + 1)
                              % 6).toString();
            canvas.walls.splice(parseInt(index, 10), 1);
        }
        this.setState({
            canvas: canvas,
            control: control,
        });
    }

    onCellChange(e) {
        let canvas  = this.state.canvas;
        let control = this.state.control;
        let index   = null;
        for (let c in canvas.cells) {
            if ((canvas.cells[c].pos[0] === control.nx) 
             && (canvas.cells[c].pos[1] === control.ny)) {
                index = c;
            }
        }
        if (index == null) {
            return;
        } else {
            if (e.target.name === "cell-background") {
                canvas.cells[index].background = e.target.value;
                control.background = e.target.value;
            } else if (e.target.name === "hex-background") {
                canvas.hexs[index].background = e.target.value;
                control.hex.background = e.target.value;
            } else if (e.target.name === "hex-stroke") {
                canvas.hexs[index].stroke = e.target.value;
                control.hex.stroke = e.target.value;
            } else if (e.target.name === "hex-color") {
                canvas.hexs[index].color = e.target.value;
                control.hex.color = e.target.value;
            } else if (e.target.name === "hex-title") {
                canvas.hexs[index].title = e.target.value;
                control.hex.title = e.target.value;
            } else if (e.target.name === "hex-icon") {
                canvas.hexs[index].icon = e.target.value;
                control.hex.icon = e.target.value;
            } else if (e.target.name === "hex-link") {
                canvas.hexs[index].link = e.target.value;
                control.hex.link = e.target.value;
            }
        }
        this.setState({
            canvas: canvas,
            control: control,
        });
    }

    onConnectorChange(e) {
        let canvas = this.state.canvas;
        let control = this.state.control;
        let index = null;
        for (let c in canvas.conns) {
            if ((canvas.conns[c].pos[0] === control.nx)
             && (canvas.conns[c].pos[1] === control.ny)
             && (canvas.conns[c].direction === control.conn.direction)) {
                 index = c;
                 break;
             }
        }
        if (index == null) {
            if (e.target.name === "conn-direction") {
                control.conn.direction = e.target.value;
            } else if (e.target.name === "conn-color") {
                control.conn.color = e.target.value;
            } else if (e.target.name === "conn-arrow") {
                control.conn.arrow = e.target.checked;
            }
        } else {
            if (e.target.name === "conn-direction") {
                control.conn.direction = e.target.value;
            } else if (e.target.name === "conn-color") {
                canvas.conns[index].color = e.target.value;
                control.conn.color = e.target.value;
            } else if (e.target.name === "conn-arrow") {
                canvas.conns[index].arrow = e.target.checked;
                control.conn.arrow = e.target.checked;
            }
        }
        this.setState({
            canvas: canvas,
            control: control,
        });
    }

    onWallChange(e) {
        let canvas = this.state.canvas;
        let control = this.state.control;
        let index = null;
        for (let w in canvas.walls) {
            if ((canvas.walls[w].pos[0] === control.nx)
             && (canvas.walls[w].pos[1] === control.ny)
             && (canvas.walls[w].side === control.wall.side)) {
                index = w;
                break;
            }
        }
        if (index == null) {
            if (e.target.name === "wall-side") {
                control.wall.side = e.target.value;
            } else if (e.target.name === "wall-color") {
                control.wall.side = e.target.value;
            }
        } else {
            if (e.target.name === "wall-side") {
                control.wall.side = e.target.value;
            } else if (e.target.name === "wall-color") {
                canvas.walls[index].color = e.target.value;
                control.wall.color = e.target.value;
            }
        }
        this.setState({
            canvas: canvas,
            control: control,
        });
    }

    onCellSelect(e) {
        const canvas = this.state.canvas;
        let control = this.state.control;
        const id = e.target.id.split('-');
        const nx = id[1];
        const ny = id[2];
        let index = null;
        for (let c in canvas.cells) {
            if ((canvas.cells[c].pos[0] === nx) && (canvas.cells[c].pos[1] === ny)) {
                index = c;
            }
        }
        if (index != null) {
            control.background      = canvas.cells[index].background;
            control.hex.background  = canvas.hexs[index].background;
            control.hex.stroke      = canvas.hexs[index].stroke;
            control.hex.color       = canvas.hexs[index].color;
            control.hex.title       = canvas.hexs[index].title;
            control.hex.icon        = canvas.hexs[index].icon;
            control.hex.link        = canvas.hexs[index].link;
        }
        control.nx = nx;
        control.ny = ny;
        this.setState({control: control});
    }

    onWallSelect(e) {
        const canvas = this.state.canvas;
        let control = this.state.control;
        const id = e.target.id.split('-');
        const nx = id[1];
        const ny = id[2];
        const side = id[3];
        let index = null;
        for (let w in canvas.walls) {
            if ((canvas.walls[w].pos[0] === nx)
             && (canvas.walls[w].pos[1] === ny)
             && (canvas.walls[w].side === side)) {
                index = w;
                break;
            }
        }
        if (index != null) {
            control.wall.side       = canvas.walls[index].side;
            control.wall.color      = canvas.walls[index].color;
        }
        control.nx = nx;
        control.ny = ny;
        this.setState({control: control});
    }

    render(){
        const controlWidth = {maxWidth: 600};
        const imageStyle = {float: 'right'};
        return (
            <div className="hex-editor">
              <div className="container-fluid">
                  <br />
                  <div className="row">
                    <div className="col-sm-3" style={controlWidth}>
                      <div className="card">
                        <div className="card-header">
                          <h2>HoneyCloud Editor
                            <img
                                src={logo}
                                alt="logo"
                                style={imageStyle}
                                width="200"
                                />
                          </h2>
                          <br />
                        <GlobalControl 
                            canvas={this.state.canvas}
                            onGlobalChange={this.onGlobalChange}
                            />
                      </div>
                      <div className="card-block">
                        <CellControl
                            control={this.state.control}
                            onCellChange={this.onCellChange}
                            onCellCreate={this.onCellCreate}
                            onCellRemove={this.onCellRemove}
                            />
                      </div>
                      <div className="card-block">
                        <HexControl
                            control={this.state.control}
                            onCellChange={this.onCellChange}
                            />
                      </div>
                      <div className="card-block">
                        <ConnectorControl
                            control={this.state.control}
                            onConnectorChange={this.onConnectorChange}
                            onConnectorCreate={this.onConnectorCreate}
                            onConnectorClear={this.onConnectorClear}
                            />
                      </div>
                      <div className="card-block">
                        <WallControl
                            control={this.state.control}
                            onWallCreate={this.onWallCreate}
                            onWallClear={this.onWallClear}
                            onWallChange={this.onWallChange}
                            />
                      </div>
                      <div className="card-block">
                        <Exporter 
                            canvas={this.state.canvas}
                            control={this.state.control}
                            onLoad={this.onLoad}
                            onSave={this.onSave}
                            />
                      </div>
                      <div className="card-footer">
                        <FooterAbout />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <Canvas
                        canvas={this.state.canvas}
                        onCellSelect={this.onCellSelect}
                        onWallSelect={this.onWallSelect}
                        />
                  </div>
                </div>
              </div>
            </div>
        );
    }

}

export default Editor;


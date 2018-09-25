import React from 'react';


var FontAwesome = require('react-fontawesome');

class Exporter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control: this.props.control,
            canvas:  this.props.canvas,
        };

        this.height = "1";
        this.width  = "1";
        this.onExport         = this.onExport.bind(this);
        //this.onSave           = this.onSave.bind(this);
        //this.onLoad           = this.onLoad.bind(this);
        this.onUpload         = this.onUpload.bind(this);
        this.onFilenameChange = this.onFilenameChange.bind(this);
        this.onGenerateCode   = this.onGenerateCode.bind(this);
        this.onCopyCode       = this.onCopyCode.bind(this);

        this.onLoad = this.props.onLoad;
        this.onSave = this.props.onSave;
    }

    onFilenameChange(e) {
        let filename = e.target.value;
        let control = this.state.control;
        control.filename = filename;
        this.setState({filename: filename});
    }

    onExport(e) {
        let svg = document.getElementById("canvas");
        let can = document.getElementById("auxiliary-canvas");

        let ctx = can.getContext('2d');
        let data = (new XMLSerializer()).serializeToString(svg);
        let domurl = window.URL || window.webkitURL || window;
        let img = new Image();
        let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        let url = domurl.createObjectURL(svgBlob);

        let filename;
        if (this.state.filename === "" || this.state.filename == null) {
            filename = "HoneyCloud.png";
        } else {
            filename = this.state.filename + ".png";
        }
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            domurl.revokeObjectURL(url);

            let imgURI = can
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            
            let evt = new MouseEvent('click', {
                view: window,
                bubbles: false,
                cancelable: true,
            });

            let a = document.createElement('a');
            a.setAttribute('download', filename);
            a.setAttribute('href', imgURI);
            a.setAttribute('target', '_blank');
            a.dispatchEvent(evt);
        };
        img.src = url;
    }
/*
    onSave(e) {
        console.log("onsave");
        const canvas = this.state.canvas;
        const json = JSON.stringify(canvas);
        console.log(canvas);

        let filename;
        if (this.state.filename === "" || this.state.filename == null) {
            filename = "HoneyCloud.txt";
        } else {
            filename = this.state.filename + ".txt";
        }
        let evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true,
        });
        let a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
        a.setAttribute('download', filename);
        a.dispatchEvent(evt);
    }
*/
    onUpload(e) {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = function(){
            let text = reader.result;
            const aux = document.getElementById('loader');
            aux.innerHTML = text;
        };
        reader.readAsText(input.files[0]);
    }
/*
    onLoad(e) {
        console.log("adasdad");
        const aux = document.getElementById('loader');
      //  const json = JSON.parse(aux.innerHTML);
        let control = this.state.control;
      //  console.log(json);

        control.background = "#111111";
    }
*/
    onGenerateCode(e){
        const svg = document.getElementById("canvas");
        const code = svg.innerHTML;
        let control = this.state.control;
        control.code = code;
        this.setState({control: control});
    }

    onCopyCode(e){
        let copytext = document.getElementById("code-text");
        copytext.select();
        document.execCommand("copy");
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

    defineCanvasSize(){
        const arm       = this.defineUnitSize();
        const Nx        = parseInt(this.props.canvas.globals.Nx, 10);
        const Ny        = parseInt(this.props.canvas.globals.Ny, 10);
        const pitchX    = 3*arm;
        const pitchY    = arm*Math.cos(Math.PI/6);
        const width     = Nx*pitchX
                        - 1.5*arm*(Ny === 1)
                        + (Ny % 2)*0.5*arm
                        + ((1 + Ny) % 2)*Math.sin(Math.PI/6)*arm
                        + 0.20*arm*Math.cos(Math.PI/6);
        const height    = this.props.canvas.globals.Ny*pitchY + arm
                        + 0.05*arm;
        return [width, height];
    }

    render() {
        const hiddenitem = {display: "none"};
        const size = this.defineCanvasSize();
        const height = size[1];
        const width  = size[0];
        const tstyle = {
            minHeight: 95,
            width: "100%",
        };
        const cstyle = {
            minHeight: 95,
        };
        return (
            <div className="hex-ctrl hex-ctrl-export">
              <div className="card-title">
                <h5>Generate Output</h5>
                <h6>Save as an image or use the SVG code.</h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-3">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="export-button"
                            name="export"
                            type="button"
                            onClick={this.onExport} >
                            Export
                        </button>
                      </div>
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="save-button"
                            name="save"
                            type="button"
                            onClick={this.onSave} >
                            Save
                        </button>
                      </div>
                      <div className="input-group">
                        <input
                            className="btn btn-primary btn-block"
                            id="upload-button"
                            name="upload"
                            accept="text/plain"
                            type="file"
                            onChange={this.onUpload} 
                        />
                      </div>
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="load-button"
                            name="load"
                            type="button"
                            onClick={this.onLoad} >
                            Load
                        </button>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="file"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="filename"
                            type="text"
                            value={this.state.control.filename}
                            onChange={this.onFilenameChange}
                            />
                        <div className="input-group-addon">.png</div>
                      </div>
                    </div>
                  </div>
                
                  <div className="form-group row">
                    <div className="col-3">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="generate-button"
                            name="generate"
                            type="button"
                            onClick={this.onGenerateCode} >
                            Generate
                        </button>
                      </div>
                      <br />
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="generate-button"
                            name="generate"
                            type="button"
                            onClick={this.onCopyCode} >
                            Copy
                        </button>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="input-group">
                        <div className="input-group-addon" style={cstyle}>
                          <FontAwesome
                            name="code"
                            size="lg"
                          />
                        </div>
                        <textarea
                            style={tstyle}
                            id="code-text"
                            name="svg-output"
                            value={this.state.control.code}
                            readOnly
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div style={hiddenitem} >
                    <canvas 
                        width={width}
                        height={height} 
                        id="auxiliary-canvas">
                    </canvas>
                    <p id="loader"></p>
                </div>
              </div>
            </div>
        );
    }
}

export default Exporter;


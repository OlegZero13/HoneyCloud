import React from 'react';


var FontAwesome = require('react-fontawesome');

class IOInterface extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control: this.props.control,
            canvas:  this.props.canvas,
        };

        this.height = "1";
        this.width  = "1";
        this.onExport         = this.onExport.bind(this);
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
        control.globals.filename = filename;
        this.setState({filename: filename});
    }

    onExport(e) {
        let svg = document.getElementById("canvas-ancilla");
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

    onUpload(e) {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = function(){
            let text = reader.result;
            const aux = document.getElementById('loader');
            aux.innerHTML = text;
            const fln = document.getElementById('input-filename');
            fln.value = input.files[0].name.split('.')[0];
        };
        reader.readAsText(input.files[0]);
    }

    onGenerateCode(e){
        const svg = document.getElementById("canvas");
        const code = svg.innerHTML;
        let control = this.state.control;
        control.globals.code = code;
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
        const ustyle = {
            display: "none",
        };
        return (
            <div className="hex-ctrl hex-ctrl-export">
              <div className="card-title">
                <h5>Generate Output</h5>
                <h6>Specify the file name.</h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-12">
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
                            value={this.state.control.globals.filename}
                            onChange={this.onFilenameChange}
                            />
                        <div className="input-group-addon">.png | .txt</div>
                      </div>
                    </div>
                  </div>

                  <h6>Save as text or export as an image.</h6>
                  <div className="form-group row">
                    <div className="col-6">
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
                    </div>
                    <div className="col-6">
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
                    </div>
                  </div>
                  <h6>Generate SVG code and copy to clipboard.</h6>
                  <div className="form-group row">
                    <div className="col-4">
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
                    <div className="col-8">
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
                            value={this.state.control.globals.code}
                            readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <h5>Accept Input</h5>
                  <h6>Source file name.</h6>
                  <div className="form-group row">
                    <div className="col-12">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="file"
                            size="lg"
                          />
                        </div>
                        <input
                            disabled
                            id="input-filename"
                            className="form-control"
                            name="input-filename"
                            type="text"
                            />
                        <div className="input-group-addon">.json | .txt</div>
                      </div>
                    </div>
                  </div>
                  <h6>Load from text and apply to continue.</h6>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <label 
                            className="btn btn-primary btn-block"
                            htmlFor="upload-button"
                        >
                        <input
                            id="upload-button"
                            name="upload"
                            accept="text/plain"
                            type="file"
                            style={ustyle}
                            onChange={this.onUpload} 
                        />
                        Load
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            id="load-button"
                            name="load"
                            type="button"
                            onClick={this.onLoad} >
                            Apply
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
                <div style={hiddenitem} >
                    <p id="loader"></p>
                    <canvas 
                        width={width}
                        height={height} 
                        id="auxiliary-canvas">
                    </canvas>
                    <p id="filename"></p>
                </div>
              </div>
            </div>
        );
    }
}

export default IOInterface;


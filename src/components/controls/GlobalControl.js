import React from 'react';


var FontAwesome = require('react-fontawesome');

class GlobalControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: this.props.canvas,
            control: this.props.control,
        };
        this.handleGlobalChange = this.props.onGlobalChange;
    }

    render() {
        return (
            <div className="hex-ctrl hex-ctrl-global">
              <div className="card-title">
                <h5>Global Settings</h5>
                <h6>Define Area</h6>
              </div>

              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">X</div>
                        <input
                            className="form-control"
                            name="Nx"
                            type="number"
                            value={this.state.control.globals.Nx}
                            onChange={this.handleGlobalChange} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">Y</div>
                        <input
                            className="form-control"
                            name="Ny"
                            type="number"
                            value={this.state.control.globals.Ny}
                            onChange={this.handleGlobalChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-9">
                      <div className="input-group">
                        <div className="input-group-addon">&#x2B23;</div>
                        <select
                            className="custom-select form-control"
                            name="grid"
                            value={this.state.control.globals.grid}
                            onChange={this.handleGlobalChange} >
                            <option value="XS">extra small</option>
                            <option value="S">small</option>
                            <option value="M">medium</option>
                            <option value="L">large</option>
                            <option value="XL">extra large</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="eye"
                            size="lg"
                          />
                        </div>
                        <label className="custom-checkbox">
                        <input
                            name="showGrid"
                            type="checkbox"
                            checked={this.state.control.globals.showGrid}
                            onChange={this.handleGlobalChange} />
                        <span className="checkmark"></span>
                      </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">&#x2B23;</div>
                        <input
                            className="form-control"
                            name="gridColor"
                            type="color"
                            value={this.state.control.globals.gridColor}
                            onChange={this.handleGlobalChange} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">&#x25A1;</div>
                        <input
                            className="form-control"
                            name="background"
                            type="color"
                            value={this.state.control.globals.background}
                            onChange={this.handleGlobalChange} />
                      </div>
                    </div>
                  </div>          
                </form>
              </div>
              
            </div>
        );
    }
}

export default GlobalControl;


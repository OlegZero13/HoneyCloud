import React from 'react';


var FontAwesome = require('react-fontawesome');

class WallControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control: this.props.control,
        };
        this.handleWallChange = this.props.onWallChange;
        this.handleWallCreate = this.props.onWallCreate;
        this.handleWallClear  = this.props.onWallClear;
    }

    render() {
        return (
            <div className="hex-ctrl hex-ctrl-wall">
              <div className="card-title">
                <h5>Wall Settings</h5>
                <h6>Define through the cell and direction.</h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="wall-add"
                            type="button"
                            onClick={this.handleWallCreate} >
                            Add
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="wall-clear"
                            type="button"
                            onClick={this.handleWallClear} >
                            Clear
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-4">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="object-group"
                            size="lg"
                          />
                        </div>
                        <select
                            className="form-control"
                            name="wall-side"
                            value={this.state.control.wall.side}
                            onChange={this.handleWallChange} >
                            <option value="0">&#x2191;</option>
                            <option value="1">&#x2197;</option>
                            <option value="2">&#x2198;</option>
                            <option value="3">&#x2193;</option>
                            <option value="4">&#x2199;</option>
                            <option value="5">&#x2196;</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="object-group"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="wall-color"
                            type="color"
                            value={this.state.control.wall.color}
                            onChange={this.handleWallChange} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}

export default WallControl;


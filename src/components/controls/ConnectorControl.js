import React from 'react';


var FontAwesome = require('react-fontawesome');

class ConnectorControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control: this.props.control,
        };
        this.handleConnectorChange = this.props.onConnectorChange;
        this.handleConnectorCreate = this.props.onConnectorCreate;
        this.handleConnectorClear  = this.props.onConnectorClear;
    }

    render() {
        return (
            <div className="hex-ctrl hex-ctrl-conn">
              <div className="card-title">
                <h5>Connector Settings</h5>
                <h6>Define through the cell, direction and arrows.</h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="conn-add"
                            type="button"
                            onClick={this.handleConnectorCreate} >
                            Add
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="conn-clear"
                            type="button"
                            onClick={this.handleConnectorClear} >
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
                            name="location-arrow"
                            size="lg"
                          />
                        </div>
                        <select
                            className="form-control"
                            name="conn-direction"
                            value={this.state.control.conn.direction}
                            onChange={this.handleConnectorChange} >
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
                            name="location-arrow"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="conn-color"
                            type="color"
                            value={this.state.control.conn.color}
                            onChange={this.handleConnectorChange} />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="location-arrow"
                            size="lg"
                          />
                        </div>
                        <label className="custom-checkbox">
                        <input
                            className="form-input"
                            name="conn-arrow"
                            type="checkbox"
                            value={this.state.control.conn.arrow}
                            onChange={this.handleConnectorChange} />
                        <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
        );
    }
}

export default ConnectorControl;


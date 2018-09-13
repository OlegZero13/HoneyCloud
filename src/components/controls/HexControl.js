import React from 'react';


var FontAwesome = require('react-fontawesome');

class HexControl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control: this.props.control,
        };
        this.handleCellChange = this.props.onCellChange;
        this.handleCellCreate = this.props.onCellCreate;
        this.handleCellRemove = this.props.onCellRemove;
    }

    render() {
        return (
            <div className="hex-ctrl hex-ctrl-hex">
              <div className="card-title">
                <h5>Hex Settings</h5>
                <h6>Define the inner element.
                    Use <a href="https://origin.fontawesome.com/icons?d=gallery">
                    Font-Awesome
                    </a> names.
                </h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-4">
                      <div className="input-group">
                        <div className="input-group-addon">&#x2B23;</div>
                        <input
                            className="form-control"
                            name="hex-background"
                            type="color"
                            value={this.state.control.hex.background}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <span className="rot">&#x2B21;</span>
                        </div>
                        <input
                            className="form-control"
                            name="hex-stroke"
                            type="color"
                            value={this.state.control.hex.stroke}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="font"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="hex-color"
                            type="color"
                            value={this.state.control.hex.color}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-12">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="header"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="hex-title"
                            type="text"
                            value={this.state.control.hex.title}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-12">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="file-image-o"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="hex-icon"
                            type="text"
                            value={this.state.control.hex.icon}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-12">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <FontAwesome
                            name="link"
                            size="lg"
                          />
                        </div>
                        <input
                            className="form-control"
                            name="hex-link"
                            type="text"
                            value={this.state.control.hex.link}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}

export default HexControl;


import React from 'react';

class CellControl extends React.Component {
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
            <div className="hex-ctrl hex-ctrl-cell">
              <div className="card-title">
                <h5>Cell Settings</h5>
                <h6>Click on the cell to select.</h6>
              </div>
              <div className="card-text">
                <form>
                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">x</div>
                        <input
                            readOnly
                            className="form-control"
                            name="nx"
                            type="text"
                            value={this.state.control.nx}
                         />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <div className="input-group-addon">y</div>
                        <input
                            readOnly
                            className="form-control"
                            name="ny"
                            type="text"
                            value={this.state.control.ny}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-12">
                      <div className="input-group">
                        <div className="input-group-addon">
                          <span className="rot">&#x2B21;</span>
                        </div>
                        <input
                            className="form-control"
                            name="cell-background"
                            type="color"
                            value={this.state.control.background}
                            onChange={this.handleCellChange} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="cell-create"
                            type="button"
                            onClick={this.handleCellCreate} >
                            Create
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group">
                        <button
                            className="btn btn-primary btn-block"
                            name="cell-remove"
                            type="button"
                            onClick={this.handleCellRemove} >
                            Remove
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
        );
    }
}

export default CellControl;


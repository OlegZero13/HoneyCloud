import React from 'react';


var FontAwesome = require('react-fontawesome');

class FooterAbout extends React.Component {
    render() {
        return (
            <div>
              <div className="card-title">
                <h5>About</h5>
              </div>
              <div className="card-text">
                <div className="row footer-about">
                  <div className="col-6">
                        <FontAwesome
                            name="github"
                            size="lg"
                        />
                        <p><a href="https://github.com/OlegZero13/HoneyCloud">HoneyCloud</a> is an open source project.</p>
                   </div>
                   <div className="col-6">
                       <FontAwesome
                            name="legal"
                            size="lg"
                       />
                       <br />
                       None of your data or drawings are stored.
                   </div>
                 </div>
                 <p>Created by <a href="https://zerowithdot.com">Oleg Żero</a> using <a href="https://reactjs.org">React.js</a>.</p>
              </div>
            </div>
        );
    }
}

export default FooterAbout;


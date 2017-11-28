import React, { Component } from 'react';
// import './Parameters.css';
import Parameter from './Parameter';

class Parameters extends Component {
  render() {
    let parameterComps = [];
    let key = 0;
    for (let param in this.props.params) {
      parameterComps.push(
        <Parameter _handleOneParamChange={this.props._handleOneParamChange}
          param={param} key={key} value={this.props.params[param]} />
      );
      key++;
    }

    return (
      <div className="Parameters">
        { parameterComps }
      </div>
    );
  }
}

export default Parameters;

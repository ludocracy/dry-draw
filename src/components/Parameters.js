import React, { Component } from 'react';
import '../css/Parameters.css';
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
        <h3>{parameterComps.length > 0 ? 'Parameters/Values' : ''}</h3>
        { parameterComps }
      </div>
    );
  }
}

export default Parameters;

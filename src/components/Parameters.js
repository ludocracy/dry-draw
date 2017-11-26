import React, { Component } from 'react';
// import './Parameters.css';
import Parameter from './Parameter';

class Parameters extends Component {
  render() {
    let parameterComps = [];
    for (let param in this.props.params) {
      parameterComps.push(
        <Parameter _handleParamsChange={this.props._handleParamsChange}
          param={param} value={this.props.params[param]} />
      );
    }

    return (
      <div className="Parameters">
        { parameterComps }
      </div>
    );
  }
}

export default Parameters;

import React, { Component } from 'react';
// import './Parameters.css';

class Parameters extends Component {
  render() {
    let parameterItems = [];
    for (let param in this.props.params) {
      parameterItems.push(<p>{`${param}=>${this.props.params[param]}`}</p>);
    }

    return (
      <div className="Parameters">
        { parameterItems }
      </div>
    );
  }
}

export default Parameters;

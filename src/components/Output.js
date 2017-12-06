import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import '../css/Output.css';

class Output extends Component {
  render() {
    return (
      <div className="Output">
        <h2>Output SVG</h2>
        <SVGInline svg={this.props.svg} height="400" width = "400" />
      </div>
    );
  }
}

export default Output;

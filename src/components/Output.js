import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import '../css/Output.css';

class Output extends Component {
  render() {
    return (
      <div className="Output">
        <SVGInline svg={this.props.svg} />
        <h2>Hovered element exists when:</h2>
        <p>{this.props.hoverText}</p>
      </div>
    );
  }
}

export default Output;

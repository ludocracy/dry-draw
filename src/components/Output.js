import React, { Component } from 'react';
import SVGInline from 'react-svg-inline';
import '../css/Output.css';

class Output extends Component {
  render() {
    return (
      <div className="Output">
        <SVGInline svg={this.props.svg} />
      </div>
    );
  }
}

export default Output;

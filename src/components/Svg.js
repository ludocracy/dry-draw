import React, { Component } from 'react';
import '../css/Svg.css';
import SVGInline from "react-svg-inline";
import Parameters from './Parameters';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: ''
    }

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(e) {
    this.setState({
      svg: this.inputRef.value
    })
  }

  render() {
    return (
      <div className="Svg">
        <h2>paste raw SVG XML here:</h2>
        <textarea wrap="hard" onChange={this._handleChange}
          ref={input => this.inputRef = input}/>
        <Parameters />
        <SVGInline svg={this.state.svg} />
      </div>
    );
  }
}

export default Svg;

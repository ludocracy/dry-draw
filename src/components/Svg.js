import React, { Component } from 'react';
import '../css/Svg.css';
import SVGInline from "react-svg-inline";
import Parameters from './Parameters';
import axios from 'axios';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      outputSvg: ''
    }

    this._extractParams = this._extractParams.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleParamsChange = this._handleParamsChange.bind(this);
  }

  _handleParamsChange(param, value) {
    let newParams = this.state.params;
    newParams[param] = value === '' ? null : value;
    this.setState({
      params: newParams
    });
  }

  _handleChange(e) {
    this.setState({
      params: this._extractParams(this.svg.value)
    });
  }

  _extractParams(str) {
    let macroRegex = /@\(.+\)/g;
    let paramRegex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    let macroMatch;
    let params = {};

    do { // iterate through macro string matches
      macroMatch = macroRegex.exec(str);
      if (macroMatch) {
        let paramMatch;
        do { // iterate through param matches within this macro string
          paramMatch = paramRegex.exec(macroMatch[0]);
          if (paramMatch) {
            params[paramMatch[0]] = null;
          }
        } while (paramMatch)
      }
    } while (macroMatch);
    return params;
  }

  _handleSubmit(e) {
    e.preventDefault();
    // const url = 'https://duxml.herokuapp.com/evaluateStr';
    const url = 'http://localhost:4567/evaluateStr';
    let defined_params = {}
    for (let key in this.state.params) {
      if (this.state.params[key] !== null) {
        defined_params[key] = this.state.params[key]
      }
    }

    axios({
      method: 'post',
      url: url,
      responseType: 'text',
      params: defined_params,
      data: this.svg.value
    })
    .then(response => {
      this.setState({
        outputSvg: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="Svg">
        <h2>paste raw SVG XML here:</h2>
        <form onSubmit={this._handleSubmit}>
          <textarea wrap="hard" onChange={this._handleChange}
            ref={input => this.svg = input}/>
          <button type="submit">resolve SVG</button>
        </form>
        <Parameters params={this.state.params} _handleParamsChange={this._handleParamsChange} />
        <SVGInline svg={this.state.outputSvg} />
      </div>
    );
  }
}

export default Svg;

import React, { Component } from 'react';
import '../css/Svg.css';
import Output from './Output';
import Parameters from './Parameters';
import Editor from './Editor';
import axios from 'axios';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      outputSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="272" height="92">
      </svg>`,
      hoverText: ''
    }

    this._handleParamsChange = this._handleParamsChange.bind(this);
    this._handleOneParamChange = this._handleOneParamChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getDefinedParams = this._getDefinedParams.bind(this);
  }

  _getDefinedParams() {
    let defined_params = {}
    for (let key in this.state.params) {
      let value = this.state.params[key];
      if (value && value !== '') {
        defined_params[key] = value;
      }
    }
    return defined_params;
  }

  _handleSubmit(svg) {
    const url = 'https://cors-anywhere.herokuapp.com/https://duxml.herokuapp.com/resolveXML';
    // const url = 'http://localhost:4567/resolveXML';

    axios({
      method: 'post',
      url: url,
      responseType: 'text',
      params: this._getDefinedParams(),
      data: {xml: svg}
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

  _handleParamsChange(newParams) {
    for (let param in newParams) {
      let oldValue = this.state.params[param];
      if(oldValue && oldValue !== '') {
        newParams[param] = oldValue;
      }
    }
    this.setState({
      params: newParams
    });
  }

  _handleOneParamChange(param, value) {
    let newParams = this.state.params;
    newParams[param] = value === '' ? null : value;
    this.setState({
      params: newParams
    });
  }

  render() {
    return (
      <div className="Svg">
        <h2>Paste SVG file here. Wrap logical expressions in @(...).</h2>
        <div className="svg-container">
          <Editor _handleSubmit={this._handleSubmit}
            _handleParamsChange={this._handleParamsChange} />
          <Parameters params={this.state.params}
            _handleOneParamChange={this._handleOneParamChange} />
          <Output svg={this.state.outputSvg} />
        </div>
      </div>
    );
  }
}

export default Svg;

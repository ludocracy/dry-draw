import React, { Component } from 'react';
import '../css/Svg.css';
import SVGInline from "react-svg-inline";
import Parameters from './Parameters';
import Editor from './Editor';
import axios from 'axios';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      outputSvg: '',
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
        console.log(`param: ${param}, oldValue: ${oldValue}`)
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

  componentDidUpdate() {
    if(this.state.outputSvg !== '') {
      document.querySelectorAll('[if]').forEach(el => {
        el.addEventListener('mouseenter', e => {
          this.setState({
            hoverText: el.getAttribute('if')
          });
        });
        el.addEventListener('mouseleave', e => {
          this.setState({
            hoverText: ''
          });
        });
      });
    }
  }

  render() {
    let instructions = `
Paste a raw SVG file here. Any attribute value or string content can contain a logical expression.
Expressions must be wrapped with @(...). Click 'Resolve XML' to evaluate logical expressions and produce a permutation of the original SVG.
Any parameters without values will be passed to the output.
The user of your generated SVG can provide that value themselves, or not!
    `
    return (
      <div className="Svg">
        <h2>Edit SVG here</h2>
        <p className="svg-instructions">
          { instructions }
        </p>
        <Editor _handleSubmit={this._handleSubmit}
          _handleParamsChange={this._handleParamsChange}/>
        <Parameters params={this.state.params}
          _handleOneParamChange={this._handleOneParamChange} />
        <SVGInline svg={this.state.outputSvg} />
        <p><span>Hovered element exists when: </span><span>{this.state.hoverText}</span></p>
      </div>
    );
  }
}

export default Svg;

import React, { Component } from 'react';
// import './Expressions.css';

import axios from 'axios';

import Parameters from './Parameters';

class Expressions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      evaluatedStr: ''
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
      params: this._extractParams(this.expression.value)
    });
  }

  _extractParams(str) {
    let regex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    let match;
    let params = {};

    do {
      match = regex.exec(str);
      if (match) {
        params[match[0]] = null;
      }
    } while (match);
    return params;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const url = 'https://cors-anywhere.herokuapp.com/https://duxml.herokuapp.com/evaluateStr';
    // const url = 'http://localhost:4567/evaluateStr';
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
      data: this.expression.value
    })
    .then(response => {
      this.setState({
        evaluatedStr: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="Expressions">
        <form onSubmit={this._handleSubmit}>
          <input type="text" ref={input => this.expression = input} onChange={this._handleChange}/>
          <button type="submit">Evaluate</button>
        </form>
        <Parameters params={this.state.params} _handleParamsChange={this._handleParamsChange}/>
        <p className="evaluatedStr">{this.state.evaluatedStr}</p>
      </div>
    );
  }
}

export default Expressions;

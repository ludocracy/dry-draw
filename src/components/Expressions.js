import React, { Component } from 'react';
// import './Expressions.css';
import axios from 'axios';

import Parameters from './Parameters';
import ExpressionForm from './ExpressionForm';

class Expressions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      evaluatedExpression: ''
    }

    this._handleParamsChange = this._handleParamsChange.bind(this);
    this._handleOneParamChange = this._handleOneParamChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._getDefinedParams = this._getDefinedParams.bind(this);
  }

  _getDefinedParams() {
    let defined_params = {}
    for (let key in this.state.params) {
      if (this.state.params[key] !== null) {
        defined_params[key] = this.state.params[key];
      }
    }
    return defined_params;
  }

  _handleOneParamChange(param, value) {
    let newParams = this.state.params;
    newParams[param] = value === '' ? null : value;
    this.setState({
      params: newParams
    });
  }

  _handleSubmit(expression) {
    const url = 'https://cors-anywhere.herokuapp.com/https://duxml.herokuapp.com/evaluateStr';
    // const url = 'http://localhost:4567/evaluateStr';

    axios({
      method: 'post',
      url: url,
      responseType: 'text',
      params: this._getDefinedParams(),
      data: expression
    })
    .then(response => {
      this.setState({
        evaluatedExpression: response.data
      })
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

  render() {
    return (
      <div className="Expressions">
        <ExpressionForm _handleSubmit={this._handleSubmit}
          _handleParamsChange={this._handleParamsChange} />
        <Parameters params={this.state.params}
          _handleOneParamChange={this._handleOneParamChange}/>
        <p className="evaluatedStr">{this.state.evaluatedExpression}</p>
      </div>
    );
  }
}

export default Expressions;

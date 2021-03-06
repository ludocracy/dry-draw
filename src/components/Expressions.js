import React, { Component } from 'react';
import '../css/Expressions.css';
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
      data: { expression: expression }
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
    let instructions = [
'Any parameter names (e.g. "variable") will appear in the parameters menu.',
'Parameter values can be numbers, boolean, strings (in quotes) or a parameter.',
'Supported operators include: + - * / ** < > <= >= == != ?:'
].map((instruction, index) => (<p key={index}>{instruction}</p>));

    let instructionsClass = Object.keys(this.state.params).length === 0
      ? 'hidden'
      : 'expression-params-instructions';

    return (
      <div className="Expressions">
        <div className="expression-container">
          <h2>Test expressions:</h2>
          <ExpressionForm _handleSubmit={this._handleSubmit}
            _handleParamsChange={this._handleParamsChange} />
          <input className="evaluatedStr" readOnly="true"
            value={this.state.evaluatedExpression}/>
        </div>
        <div className={instructionsClass}>
          <div className="expression-instructions">
            { instructions }
          </div>
          <Parameters params={this.state.params}
            _handleOneParamChange={this._handleOneParamChange}/>
        </div>
      </div>
    );
  }
}

export default Expressions;

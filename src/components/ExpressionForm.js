import React, { Component } from 'react';
// import './ExpressionForm.css';
import axios from 'axios';

class ExpressionForm extends Component {
  constructor(props) {
    super(props);

    this._extractParams = this._extractParams.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _extractParams() {
    let regex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    let match;
    let params = {};

    do {
      match = regex.exec(this.expression.value);
      if (match) {
        params[match[0]] = null;
      }
    } while (match);
    return params;
  }

  _handleChange(e) {
    this.props._handleParamsChange(this._extractParams());
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.props._handleSubmit(this.expression.value);
  }

  render() {
    return (
      <div className="ExpressionForm">
        <form onSubmit={this._handleSubmit}>
          <input type="text" ref={input => this.expression = input}
            onChange={this._handleChange}/>
          <button type="submit">Evaluate</button>
        </form>
      </div>
    );
  }
}

export default ExpressionForm;

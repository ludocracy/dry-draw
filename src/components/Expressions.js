import React, { Component } from 'react';
// import './Expressions.css';

import Parameters from './Parameters';

class Expressions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {}
    }

    this._extractParams = this._extractParams.bind(this);
    this._handleChange = this._handleChange.bind(this);
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

  render() {
    return (
      <div className="Expressions">
        <input type="text" ref={input => this.expression = input} onChange={this._handleChange}/>
        <Parameters params={this.state.params} />
      </div>
    );
  }
}

export default Expressions;

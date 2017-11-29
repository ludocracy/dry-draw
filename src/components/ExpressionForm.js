import React, { Component } from 'react';
import '../css/ExpressionForm.css';

class ExpressionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: '#FFC2E2'
    }

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
        <form className="expression-form" onSubmit={this._handleSubmit}>
          <input className="expression-input" type="text" ref={input => this.expression = input}
            onChange={this._handleChange}/>
          <button className="expression-btn"
            onMouseDown={e => this.setState({buttonColor: '#EF7A85'})}
            onMouseUp={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseEnter={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseLeave={e => this.setState({buttonColor: '#FF90B3'})}
            style={{backgroundColor: this.state.buttonColor}} type="submit">=</button>
        </form>
      </div>
    );
  }
}

export default ExpressionForm;

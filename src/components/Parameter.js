import React, { Component } from 'react';
import '../css/Parameter.css';

class Parameter extends Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(e) {
    this.props._handleOneParamChange(this.props.param, this.inputRef.value);
  }

  componentWillUpdate(nextProps) {

  }

  render() {
    return (
      <div className="Parameter">
        <span>{this.props.param}</span>
        <input onChange={this._handleChange} type="text"
          ref={input => this.inputRef = input} placeholder={this.props.value}
          value={this.props.value || ''} />
      </div>
    );
  }
}

export default Parameter;

import React, { Component } from 'react';
import '../css/Svg.css';
import SVGInline from "react-svg-inline";
import Parameters from './Parameters';
import Editor from './Editor';

class Svg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {},
      outputSvg: ''
    }

    this._handleParamsChange = this._handleParamsChange.bind(this);
    this._handleOneParamChange = this._handleOneParamChange.bind(this);
    this._setSvg = this._setSvg.bind(this);
  }

  _setSvg(svg) {
    this.setState({
      outputSvg: svg
    });
  }

  _handleParamsChange(newParams) {
    for (let param in this.state.params) {
      let oldValue = this.state.params[param];
      let newValue = newParams[param];
      if(oldValue && oldValue !== '' && newValue && newValue === '') {
        newParams[param] = oldValue;
      }
    }
    this.setState({
      params: newParams
    });
  }

  _handleOneParamChange(param, value) {
    let updatedParams = this.state.params;
    updatedParams[param] = value;
    this.setState({
      params: updatedParams
    });
  }


  render() {
    return (
      <div className="Svg">
        <h2>paste raw SVG XML here:</h2>
        <Editor params={this.state.params} _setSvg={this._setSvg}
          _handleParamsChange={this._handleParamsChange}/>
        <Parameters params={this.state.params}
          _handleOneParamChange={this._handleOneParamChange} />
        <SVGInline svg={this.state.outputSvg} />
      </div>
    );
  }
}

export default Svg;

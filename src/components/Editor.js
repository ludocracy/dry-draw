import React, { Component } from 'react';
import '../css/Editor.css';
import Designer from './designer/Designer';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objects: [{
      "text": 'Hello @(friend)',
      "radius": "0",
      "blendmode": "normal",
      "type": "text",
      "x": 100,
      "y": 50,
      fontSize: 20,
      fontFamily: "Helvetica"
    }, {
      "if": "@(a<b)",
      "width": 70,
      "height": 146,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(0, 255, 255, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 19,
      "y": 109
    }, {
      "width": 81,
      "height": 69,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(241, 97, 99, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 100,
      "y": 110
    }, {
      "width": 231,
      "height": 70,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(0, 123, 255, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 100,
      "y": 187
    }, {
      "width": 183,
      "height": 60,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(255, 241, 0, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 19,
      "y": 265
    }, {
      "width": 118,
      "height": 119,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(241, 97, 99, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 211,
      "y": 266
    }, {
      "width": 82,
      "height": 51,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(0, 255, 255, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 120,
      "y": 333
    }, {
      "width": 89,
      "height": 50,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(241, 97, 99, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 21,
      "y": 334
    }, {
      "width": 143,
      "height": 160,
      "rotate": 0,
      "strokeWidth": 0,
      "fill": "rgba(255, 241, 0, 1)",
      "radius": "0",
      "blendmode": "normal",
      "type": "rectangle",
      "x": 190,
      "y": 16
    }],
      buttonColor: "#FF90B3"
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._extractParams = this._extractParams.bind(this);
    this._updateParams = this._updateParams.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();

    let svg = document.querySelector('.designer-container>svg').outerHTML;
    this.props._handleSubmit(svg);
  }

  _extractParams() {
    let params = {};
    // let macroRegex = /@\(.+\)/g;
    let macroRegex = /@\(.+/g;
    let paramRegex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    this.state.objects.forEach(obj => {
      for (let key in obj) {
        let macroMatch;
        let value = obj[key];
        do { // iterate through macro string matches
          macroMatch = macroRegex.exec(value);
          if (macroMatch) {
            let paramMatch;
            do { // iterate through param matches within this macro string
              paramMatch = paramRegex.exec(macroMatch[0]);
              if (paramMatch) {
                params[paramMatch[0]] = null;
              }
            } while (paramMatch)
          }
        } while (macroMatch);
      }
    });

    return params;
  }

  componentDidMount() {
    this._updateParams();
  }

  _handleChange(objects) {
    this.setState({
      objects: objects
    });
    this._updateParams();
  }

  _updateParams() {
    let newParams = this._extractParams();
    this.props._handleParamsChange(newParams);
  }

  render() {
    return (
      <div className="Editor">
        <form onSubmit={this._handleSubmit}>
          <h2>Input SVG. Wrap logical expressions in @(...)</h2>
          <Designer width={400} height={400} objects={this.state.objects}
          onUpdate={this._handleChange} />
          <button type="submit"
            onMouseDown={e => this.setState({buttonColor: '#EF7A85'})}
            onMouseUp={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseEnter={e => this.setState({buttonColor: '#FFC2E2'})}
            onMouseLeave={e => this.setState({buttonColor: '#FF90B3'})}
            style={{backgroundColor: this.state.buttonColor}}>Render SVG</button>
        </form>
      </div>
    );
  }
}

export default Editor;

import React, { Component } from 'react';
import '../css/Editor.css';
import Designer from './designer/Designer';
import Button from './Button';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objects: this.props.objects,
      savedObjects: this.props.objects,
      buttonColor: "#FF90B3"
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._extractParams = this._extractParams.bind(this);
    this._updateParams = this._updateParams.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.props._handleSubmit(this.state.objects);
  }

  _extractParams() {
    let params = {};
    // let macroRegex = /@\(.+\)/g;
    let macroRegex = /@\(.+/g;
    let paramRegex = /(?:(?!true|false))\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
    this.state.objects.forEach(obj => {
      for (let key in obj) {
        let macroMatch;
        do { // iterate through macro string matches
          macroMatch = macroRegex.exec(obj[key]);
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

  _handleChange(objects) {
    this.props._handleEdit(this.state.objects);
    this.setState({
      objects: objects
    });
    this._updateParams();
  }

  _updateParams() {
    let newParams = this._extractParams();
    this.props._handleParamsChange(newParams);
  }

  componentDidMount() {
    this._updateParams();
  }

  componentWillReceiveProps(nextProps) { // part of time travel!
    if(nextProps.objects !== this.state.savedObjects) {
      this.setState({
        objects: nextProps.objects,
        savedObjects: nextProps.objects
      });
    }
  }

  render() {
    return (
      <div className="Editor">
        <form onSubmit={this._handleSubmit}>
          <h2>Wrap logical expressions in @(...)</h2>
          <div className={this.props.isEditing ? 'modified' : 'un-modifed'}>
            <Designer width={350} height={400} objects={this.state.objects}
              onUpdate={this._handleChange} />
          </div>
          <Button text="Render SVG" />
        </form>
      </div>
    );
  }
}

export default Editor;

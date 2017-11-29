import React, { Component } from 'react';
// import './SavedNav.css';
import SVGInline from "react-svg-inline";

class SavedNav extends Component {
  render() {
    return (
      <div className="SavedNav">
        <SVGInline svg={this.props.svgItem.svg}
          onClick={e => this.props._handleSelect(this.props.svgItem)}/>
      </div>
    );
  }
}

export default SavedNav;

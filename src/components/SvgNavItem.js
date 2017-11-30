import React, { Component } from 'react';
// import './SavedNav.css';
import SVGInline from "react-svg-inline";

class SavedNav extends Component {
  render() {
    let width = this.props.isCurrent ? "60" : "40";
    let height = this.props.isCurrent ? "40" : "30";
    return (
      <div className="SavedNav">
        <SVGInline svg={this.props.svgItem.svg} width={width} height={height}
          onClick={e => this.props._handleTimeTravel(this.props.currentSvg, this.props.params)}/>
        <span>{JSON.stringify(this.props.params)}</span>
      </div>
    );
  }
}

export default SavedNav;

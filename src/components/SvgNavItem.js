import React, { Component } from 'react';
// import './SavedNav.css';
import SVGInline from "react-svg-inline";

class SavedNav extends Component {
  render() {
    let svgChildren = this.props.historyItem.objects.map((obj, index) => {
      let attrs = '';
      for (let key in obj) {
        if(key !== 'type') {
          attrs += `${key}="${obj[key]}" `;
        }
      }
      return `<${obj.type} ${attrs}/>`;
    });

    let thumbnail = `<svg viewBox="0 0 ${80} ${100}">${svgChildren.join('')}</svg>`;
    console.log(`thumbnail = ${thumbnail}`)
    return (
      <div className="SvgNavItem">
        <SVGInline className={this.props.isCurrent ? "current" : "not-current"}
          svg={thumbnail}
          onClick={e => this.props._handleTimeTravel(this.props.historyItem)}/>
        <span>{JSON.stringify(this.props.historyItem.params)}</span>
      </div>
    );
  }
}

export default SavedNav;

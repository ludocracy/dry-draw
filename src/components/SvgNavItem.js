import React, { Component } from 'react';
// import './SavedNav.css';
import Preview from './designer/Preview';

class SavedNav extends Component {
  render() {
    return (
      <div className="SvgNavItem">
        <Preview className={this.props.isCurrent ? "current" : "not-current"}
          width={60} height={80}
          objects={this.props.historyItem.objects}
          onClick={e => this.props._handleTimeTravel(this.props.historyItem)}/>
        <span>{JSON.stringify(this.props.historyItem.params)}</span>
      </div>
    );
  }
}

export default SavedNav;

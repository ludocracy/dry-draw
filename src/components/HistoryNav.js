import React, { Component } from 'react';
import '../css/HistoryNav.css';
import SvgNavItem from './SvgNavItem';

class HistoryNav extends Component {
  render() {
    let historySvgComps = this.props.history.map((historyItem, index) => {
      let isCurrent = this.props.timeStamp === historyItem.timeStamp 
      return <SvgNavItem isCurrent={isCurrent}
        _handleTimeTravel={this.props._handleTimeTravel}
        historyItem={historyItem} key={index} />
    });

    return (
      <div className="HistoryNav">
        <h2>History</h2>
        <div className="history-container">
          { historySvgComps }
        </div>
      </div>
    );
  }
}

export default HistoryNav;

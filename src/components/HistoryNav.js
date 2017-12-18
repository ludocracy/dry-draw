import React, { Component } from 'react';
import '../css/HistoryNav.css';
import SvgNavItem from './SvgNavItem';
import Button from './Button';

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
        { historySvgComps.length > 0 &&
          <div>
            <h2>History</h2>
            <div className="history-container">
              <Button onClick={this.props._deleteHistory} text="Clear History" />
              { historySvgComps }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default HistoryNav;

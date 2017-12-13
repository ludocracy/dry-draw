import React, { Component } from 'react';
// import './HistoryNav.css';
import SvgNavItem from './SvgNavItem';
// import { database } from '../utils/firebase';

class HistoryNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  render() {
    let historySvgComps = this.state.history.map((historyItem, index) => {
      let isCurrent = this.props.params === historyItem.params
        && this.props.currentSvg === historyItem.Svg;
      return <SvgNavItem isCurrent={isCurrent}
        _handleTimeTravel={this.props._handleTimeTravel} svgItem={historyItem} key={index} />
    });

    return (
      <div className="HistoryNav">
      <p>History</p>
      <div className="history-container">
        { historySvgComps }
      </div>
      </div>
    );
  }
}

export default HistoryNav;

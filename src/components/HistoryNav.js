import React, { Component } from 'react';
// import './HistoryNav.css';
import SvgNavItem from './SvgNavItem';

class HistoryNav extends Component {
  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(e) {
    this.props._handleOneParamChange(this.props.param, this.inputRef.value);
  }

  componentWillUpdate(nextProps) {

  }

  render() {
    let historySvgComps = this.props.history.map((historyItem, index) => (
      <SvgNavItem svgItem={historyItem} key={index} />
    ));

    return (
      <div className="HistoryNav">
      <p>History</p>
        { historySvgComps }
      </div>
    );
  }
}

export default HistoryNav;

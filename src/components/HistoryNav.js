import React, { Component } from 'react';
// import './HistoryNav.css';
import SvgNavItem from './SvgNavItem';
import { database, auth, firebaseListToArray } from '../utils/firebase';

class HistoryNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.ref = database.ref(`users/${user.uid}/history`);
        this.ref.on('value', snapshot => {
          let history = firebaseListToArray(snapshot.val()) || this.state.history;
          this.setState({
            history: history
          });
        });
      } else {
        auth.signInAnonymously().catch(function(error) {
            console.log(error);
        });
      }
    });
  }

  componentWillUnmount() {
    if(this.ref) {
      this.ref.off();
    }
  }

  componentWillReceiveProps(nextProps) {
    let historySize = this.state.history.length;
    if(nextProps.currentSvg && (historySize === 0 ||
        this.state.history[historySize-1].svg !== nextProps.currentSvg)) {
      this.ref.push({
        svg: nextProps.currentSvg,
        params: nextProps.params
      })
    }
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

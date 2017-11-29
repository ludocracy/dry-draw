import React, { Component } from 'react';
// import './SavedNav.css';
// import SvgNavItem from './SvgNavItem';

class SavedNav extends Component {
  constructor(props) {
    super(props);

    this._handleSelectSaved = this._handleSelectSaved.bind(this);
  }

  _handleSelectSaved(e) {

  }

  render() {
    // let savedSvgComps = this.state.saved.map((savedItem, index) => (
    //   <SvgNavItem svg={savedItem.svg} key={index} />
    // ));
    return (
      <div className="SavedNav">
      </div>
    );
  }
}

export default SavedNav;

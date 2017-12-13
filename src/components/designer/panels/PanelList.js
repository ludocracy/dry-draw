import React, { Component } from 'react';
import Radium from 'radium';
import { Portal } from 'react-portal';

import styles from './styles';

class PanelList extends Component {
  render() {
    let {offset, objectComponent} = this.props;
    let style = {
      left: offset.width + offset.x,
      top: offset.y + window.scrollY,
    };
    return (
      <Portal closeOnEsc closeOnOutsideClick isOpened={true}>
        <div style={[styles.propertyPanel, style]}>
          {objectComponent.panels.map((Panel, i) => <Panel key={i} {...this.props} />)}
        </div>
      </Portal>
    );
  }
};

export default Radium(PanelList);

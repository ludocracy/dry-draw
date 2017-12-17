import React, { Component } from 'react';
// import './SavedNav.css';
import Preview from './designer/Preview';

const THUMBNAIL_RATIO = 0.2;

class SavedNav extends Component {
  _resizeSvgObjects() {
    return this.props.historyItem.objects.map(obj => {
      obj.x = THUMBNAIL_RATIO * parseInt(obj.x, 10);
      obj.y = THUMBNAIL_RATIO * parseInt(obj.y, 10);
      if (obj.fontSize) {
        obj.fontSize = THUMBNAIL_RATIO * parseInt(obj.fontSize, 10);
        obj.rotate = 0;
      } else {
        obj.height = THUMBNAIL_RATIO * parseInt(obj.height, 10);
        obj.width = THUMBNAIL_RATIO * parseInt(obj.width, 10);
      }
      return obj;
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO needed because rendering was occurring with nearly any mouse event on unrelated components!
    return false;
  }

  render() {
    return (
      <div className="SvgNavItem" onClick={e => this.props._handleTimeTravel(this.props.historyItem)}>
        <Preview className={this.props.isCurrent ? "current" : "not-current"}
          width={60} height={80}
          objects={this._resizeSvgObjects()} />
        <span>{JSON.stringify(this.props.historyItem.params)}</span>
      </div>
    );
  }
}

export default SavedNav;

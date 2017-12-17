import React, { Component } from 'react';
import '../css/SvgNavItem.css';
import Preview from './designer/Preview';

const THUMBNAIL_RATIO = 0.2;

class SavedNav extends Component {
  _resizeSvgObjects() {
    return (
      this.props.historyItem.objects.map(obj => {
        let newObj = {};
        Object.assign(newObj, obj);
        newObj.x = THUMBNAIL_RATIO * parseInt(obj.x, 10);
        newObj.y = THUMBNAIL_RATIO * parseInt(obj.y, 10);
        if (obj.fontSize) {
          newObj.fontSize = THUMBNAIL_RATIO * parseInt(obj.fontSize, 10);
        } else {
          newObj.height = THUMBNAIL_RATIO * parseInt(obj.height, 10);
          newObj.width = THUMBNAIL_RATIO * parseInt(obj.width, 10);
        }
        return newObj;
      })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    // needed because rendering was occurring with nearly any mouse event on unrelated components!
    return false;
  }

  render() {
    return (
      <div className="SvgNavItem" onClick={e => this.props._handleTimeTravel(this.props.historyItem)}>
      <div className={this.props.isCurrent ? "current" : "not-current"}>
        <Preview
          width={60} height={80}
          objects={this._resizeSvgObjects()} />
          </div>
      </div>
    );
  }
}

export default SavedNav;

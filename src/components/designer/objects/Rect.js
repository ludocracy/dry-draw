import React from 'react';
import Icon from '../Icon';

import Vector from './Vector';

export default class Rect extends Vector {
  static meta = {
    icon: <Icon icon={'rectangle'} size={30} />,
    initial: {
      width: 5,
      height: 5,
      strokeWidth: 0,
      fill: "blue",
      radius: 0,
      blendMode: "normal",
      rotate: 0
    }
  };

  render() {
    let object = this.props.object;
    return (
      <rect style={this.getStyle()}
         {...this.getObjectAttributes()}
         rx={object.radius}
         width={object.width}
         height={object.height} />
    );
  }
}

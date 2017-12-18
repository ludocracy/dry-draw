import React from 'react';
import Radium from 'radium';

function RotateAnchor(props) {
  let style = {
    marginLeft: props.boundingBox.width - 3
  };
  return (
    <div style={[styles.anchor,
                 styles.rotateAnchor,
                 style]}
         className={'rotate-anchor'}
         onMouseDown={props.onMouseDown} />
  )
};

const styles = {
  anchor: {
    'width': 10,
    'height': 10,
    ':hover': {
      'borderColor': 'gray'
    }
  },
  rotateAnchor: {
    'marginTop': -8,
    'borderRight': '2px solid #dedede',
    'borderTop': '2px solid #dedede',
    'position': 'absolute',
    'borderTopRightRadius': 3,
    'zIndex': -1
  }
};

export default Radium(RotateAnchor);

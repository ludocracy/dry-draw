import React from 'react';
import Radium from 'radium';

function ScaleAnchor(props) {
  let {boundingBox} = props;
  let style = {
    marginTop: boundingBox.height - 4,
    marginLeft: boundingBox.width - 4
  };
  return (
    <div style={[styles.anchor,
                 styles.scaleAnchor,
                 style]}
         className={'resize-anchor'}
         onMouseDown={props.onMouseDown} />
  );
};

const styles = {
  anchor: {
    'width': 10,
    'height': 10,
    ':hover': {
      'borderColor': 'gray'
    }
  },
  scaleAnchor: {
    'marginTop': -3,
    'borderRight': '2px solid #dedede',
    'borderBottom': '2px solid #dedede',
    'position': 'absolute',
    'zIndex': -1
  }
};

export default Radium(ScaleAnchor);

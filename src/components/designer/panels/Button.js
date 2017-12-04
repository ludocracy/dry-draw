import React from 'react';
import Radium from 'radium';

import styles from './styles';

const Button = ({onClick, ...props}) => {
  let _onClick = (e, ...args) => {
    e.preventDefault();
    onClick(...args);
  }
  return ( // this used to be an <a/> not <button/>
    <button href="#" style={styles.button} onClick={_onClick}>
      {props.children}
    </button>
  );
}

export default Radium(Button);

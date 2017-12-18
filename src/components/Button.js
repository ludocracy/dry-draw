import React, { Component } from 'react';
import '../css/Button.css';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: '#FF90B3'
    }
  }


  render() {
    return (
      <div className="Button">
        <button
          onMouseDown={e => this.setState({buttonColor: '#EF7A85'})}
          onMouseUp={e => this.setState({buttonColor: '#FFC2E2'})}
          onMouseEnter={e => this.setState({buttonColor: '#FFC2E2'})}
          onMouseLeave={e => this.setState({buttonColor: '#FF90B3'})}
          style={{backgroundColor: this.state.buttonColor}} type="submit">{this.props.text}</button>
      </div>
    );
  }
}

export default Button;

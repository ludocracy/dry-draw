import React, { Component } from 'react';
import './App.css';

import Expressions from './components/Expressions';
import Svg from './components/Svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"
          onMouseEnter={e => this.setState({isHover: true})}
          onMouseLeave={e => this.setState({isHover: false})}>
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/ludocracy/dry-draw">
            <h1 className="App-title">
              <span className={this.state.isHover ? "letter0" : ''}>D</span>
              <span className={this.state.isHover ? "letter1" : ''}>R</span>
              <span className={this.state.isHover ? "letter2" : ''}>Y</span>
              Draw
            </h1>
            <h2>
              <span className={this.state.isHover ? "letter0" : ''}>Don't </span>
              <span className={this.state.isHover ? "letter1" : ''}>Repeat </span>
              <span className={this.state.isHover ? "letter2" : ''}>Yourself</span>
            </h2>
          </a>
        </header>
        <Expressions />
        <Svg />
      </div>
    );
  }
}

export default App;

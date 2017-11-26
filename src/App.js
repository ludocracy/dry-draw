import React, { Component } from 'react';
import './App.css';

import Expressions from './components/Expressions';
import Svg from './components/Svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DRY Draw</h1>
          <h2>Don't Repeat Yourself</h2>
        </header>
        <Expressions />
        <Svg />
      </div>
    );
  }
}

export default App;

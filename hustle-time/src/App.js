import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import MapContainer from './containers/MapContainer'
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">HustleTime</h1>
        </header>
        <Home />
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Game } from './game/game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Schmetterling</h1>
        <Game></Game>
      </header>
    </div>
  );
}

export default App;

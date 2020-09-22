import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login"
import MainRouter from "./config/MainRouter"


function App() {
  return (
    <div className="App">
      <header className="App-header">
   <MainRouter/>
      </header>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './views/Login'
import './App.css';
import './BASIC-bootstrap.css'

class App extends Component {
  render() {
    return (
      <div className="bg-warning">
        <Route exact path='/' component={Login} />
      </div>
    )
  }
}

export default App;

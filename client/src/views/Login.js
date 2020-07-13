import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
// import '../App.css'

class Login extends Component {

  render() {
    return (
      <div className="login container-fluid text-dark">
        <div className="row justify-content-center text-center">
          <img
            className="logo-img"
            alt="Hunger Haven Logo"
            // @ts-ignore
            src={require("../assets/HH-Logo-Transparent-Color-Wings.png")}
          />
        </div>
        <div className="row justify-content-center text-center">
          <h2 className="header-font col-md-10">Welcome to Hunger Haven!</h2>
        </div>
        <div className="row justify-content-center text-center">
          <LoginForm />
        </div>
      </div >
    )
  }
}

export default Login;
import React, { Component } from 'react';
// import axios from 'axios'
import AuthService from '../AuthService';

// let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

// let api = axios.create({
//   baseURL: base + 'api/',
//   timeout: 3000,
//   withCredentials: true
// })

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login(event) {
    try {
      let user = AuthService.Login(event)
      this.setState({ user: user })
    } catch (error) {
      console.error(error)
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.login} className="col-6 col-md-3">
        <input
          className="form-control mb-2"
          type="text"
          name="email"
          id="email"
          placeholder="email"
          defaultValue={this.state.email}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="password"
          id="password"
          placeholder="password"
          defaultValue={this.state.password}
        />
        <button type="submit" value="Submit" className="btn btn-primary" ><p className="mt-n1 mb-n1">submit</p></button>
      </form>
    )
  }
}

export default LoginForm
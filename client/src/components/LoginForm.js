import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
// import axios from 'axios'
import AuthService from '../AuthService';

// let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

// let api = axios.create({
//   baseURL: base + 'api/',
//   timeout: 3000,
//   withCredentials: true
// })


function LoginForm() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => console.log(values);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

  // login(event) {
  //   try {
  //     let user = AuthService.Login(event)
  //     this.setState({ user: user })
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   event.preventDefault();
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-6 col-md-3">
      <input
        className="form-control mb-2"
        name="email"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        placeholder="email"
        defaultValue={email}
      />
      {errors.email && errors.email.message}
      <input
        className="form-control mb-2"
        name="password"
        type="password"
        ref={register({
          validate: value => value !== "admin" || "Nice try!"
        })}
        placeholder="password"
        defaultValue={password}
      />
      {errors.password && errors.username.password}
      <button type="submit" className="btn btn-primary" ><p className="mt-n1 mb-n1">submit</p></button>
    </form>
  )
}

export default LoginForm
import React, {useState} from 'react';
import { loginUser, removeSession } from "../../store/session";
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import './LoginForm.css';

export const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user); //get redux store's user data
  const [credential, setCredential] = useState(''); //username/email
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  if(sessionUser) return ( //if user's session already exist
    <Redirect to='/'/>
  )

  const handleSubmit = async (e) =>{
    try {
      e.preventDefault();
      setErrors([]);
      const response = await dispatch(loginUser({
        credential,
        password
      }));
      const userLoginResponse = await response.json();
      if(userLoginResponse && userLoginResponse.errors) setErrors(userLoginResponse.errors);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      {/* username */}
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>

      {/* password */}
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  )
}

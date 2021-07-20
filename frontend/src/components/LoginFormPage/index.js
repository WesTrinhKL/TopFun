import React, {useState} from 'react';
import { loginUser } from "../../store/session";
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { useNavbar } from '../../context/NavbarContext';

import './LoginForm.css';

export const LoginFormPage = () => {
  const {setNavLandingStyle} = useNavbar();
  setNavLandingStyle("nav-wrapper-not-landing");

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user); //get redux store's user data
  const [credential, setCredential] = useState(''); //username/email
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  if(sessionUser) return ( //if user's session already exist
    <Redirect to='/'/>
  )


  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrors([]);
    return dispatch(loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        // console.log("error res", data);
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="form-background">
      <form  onSubmit={handleSubmit}>
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
    </div>
  )
}

import React, {useState} from 'react';
import { loginUser } from "../../store/session";
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { useNavbar } from '../../context/NavbarContext';
import landingbg from '../../images/landingbg.jpg'
import { Link } from 'react-router-dom';

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
    <>
    <div>
      <img className="landing-img" src={landingbg} alt="" />
    </div>
    <div className="form-container">

      <form className="form-background" onSubmit={handleSubmit}>

        <h1>Sign In</h1>

        <ul className="error-group">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>



        {/* username */}
        <div className="username-container">
          <div className="placeholder">Username or Email</div>
          <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
        </div>


        {/* password */}
        <div className="password-container">
          <div className="placeholder">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="signin-button" type="submit">
          Log In
        </button>
        <hr />
        <button className="redirect-signup">
          <span>Not a member yet? </span>
          <Link to='/signup'>Sign up here!</Link>
        </button>
      </form>


    </div>
    </>
  )
}

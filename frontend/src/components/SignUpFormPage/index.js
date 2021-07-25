import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useNavbar } from '../../context/NavbarContext';
import './SignUpFormPage.css'
import { Link } from 'react-router-dom';
import signup from '../../images/signup.jpg'

function SignupFormPage() {
  const {setNavLandingStyle} = useNavbar();
  setNavLandingStyle("nav-wrapper-not-landing");


  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div>
      <img className="landing-img" src={signup} alt="" />
    </div>
    <div className="form-container">

      <form className="form-background-sign-up" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <ul className="error-group">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        {/* email */}
        <div className="username-container">
          <div className="placeholder">Email</div>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>

        {/* username */}
        <div className="username-container">
          <div className="placeholder">Username</div>
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

        {/* confirm password */}
        <div className="password-container">
          <div className="placeholder">Confirm Password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="signup-button" type="submit">
          Log In
        </button>

        <button className="redirect-signin">
          <span>Already a member ? </span>
          <Link to='/login'>Sign in here!</Link>
        </button>
      </form>
    </div>
    </>
  );
}

export default SignupFormPage;

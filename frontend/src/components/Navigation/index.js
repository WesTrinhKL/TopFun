import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import purbluelogoimg from '../../images/purbluelogo2.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) { //determine what to render if user is logged in
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-container__login" exact to="/login">Log In</NavLink>
        <NavLink className="nav-container__signup" exact to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="background-nav-container">
      <div className="nav-wrapper">
        <nav className="nav-container">
          <NavLink className="nav-container__home" exact to="/">
            <img className="logo" src={purbluelogoimg} alt="sd" />
            <span>topfun</span>

          </NavLink>
          <div className="nav-container__tabs">
            {isLoaded && sessionLinks}
          </div>
        </nav>
      </div>
    </div>

  );
}

export default Navigation;

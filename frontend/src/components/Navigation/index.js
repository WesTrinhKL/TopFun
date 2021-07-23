import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import purbluelogoimg from '../../images/purbluelogo2.png'
import { useNavbar } from '../../context/NavbarContext';
import { CreateListButton } from './CreateListButton';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);
  const {navbarStyle} = useNavbar(); //set navigation style based on global nav context

  let sessionLinks;
  if (sessionUser) { //determine what to render if user is logged in
    sessionLinks = (
      <div className="logged-in-buttons">
        <CreateListButton user={sessionUser} />
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-container__login" exact to="/login">Log In</NavLink>
        <NavLink className="nav-container__signup" exact to="/signup">Sign Up</NavLink>
      </>
    );
  }


  // useEffect(()=>{
  //   setNavLandingStyle(window.location.pathname === '/'? "nav-wrapper": "nav-wrapper-not-landing");
  //   console.log("nav use effect");
  // }, [navLandingStyle])

  console.log("this is the pathname", window.location.pathname);



  return (
    // <div className="background-nav-container">
    <>
      <nav className={navbarStyle}>
        <div className="nav-container">
          <NavLink className="nav-container__home" exact to="/">
            <img className="logo" src={purbluelogoimg} alt="sd" />
            <span>topfun</span>

          </NavLink>
          <div className="nav-container__tabs">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </nav>
    </>

  );
}

export default Navigation;

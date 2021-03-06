import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { CreateListButton } from './CreateListButton';
import LoginFormModal from '../LoginFormModal';

import { useNavbar } from '../../context/NavbarContext';
import './Navigation.css';

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
        <LoginFormModal/>
        <NavLink className="nav-container__signup" exact to="/signup">Sign Up</NavLink>
      </>
    );
  }

  // console.log("this is the pathname", window.location.pathname);



  return (
    // <div className="background-nav-container">
    <>
      <div className={navbarStyle}>
        <div className="nav-container">
          <NavLink className="nav-container__home" exact to="/">
            {/* <img className="logo" src={purbluelogoimg} alt="sd" /> */}
            {/* top <span className="fun-logo">fun</span> */}
            <div className="fun-logo">TopFun</div>

          </NavLink>
          <div className="nav-container__tabs">
            {isLoaded && sessionLinks}
          </div>
        </div>
      </div>
    </>

  );
}

export default Navigation;

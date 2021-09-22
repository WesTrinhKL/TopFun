import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import { useHistory } from "react-router";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu); //clean up
  }, [showMenu]);

  const history = useHistory();

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push("/");
    return;
  };

  return (
    <div className="openMenu-wrapper">
      <button className="openMenuStyle" onClick={openMenu}>
        <i className="fas fa-bars "></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>
            <div className="profile-username-button">
              <i className="fas fa-user profile-icon"></i>
              <div className="username-profile-text"> {user.username} </div>
            </div>
          </li> */}
          {/* <li>{user.email}</li> */}
          <li>
            <div className="logout-container">

              <button className="logout-button" onClick={logout}>
                <i className="fas fa-sign-out-alt logout-icon"></i>
                <div className="username-profile-text">Log Out</div>
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;

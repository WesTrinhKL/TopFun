import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="openMenu-wrapper">
      <button className="openMenuStyle" onClick={openMenu}>
        <i className="fas fa-bars "></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li >

            <div className="profile-username-button">
              <i class="fas fa-user profile-icon"></i>
              <div> {user.username} </div>
            </div>
          </li>
          {/* <li>{user.email}</li> */}
          <li>
            <div className="logout-container">

              <button className="logout-button" onClick={logout}>
                <i class="fas fa-sign-out-alt logout-icon"></i>
                <div>Log Out</div>
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;

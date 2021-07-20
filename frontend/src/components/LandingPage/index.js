import React from 'react'
import './LandingPage.css'
import landingbg from '../../images/landingbg2.jpg'
import { useNavbar } from '../../context/NavbarContext'
import { Link} from 'react-router-dom';

export const LandingPage = () => {
  const {setNavLandingStyle} = useNavbar();
  setNavLandingStyle("nav-wrapper");
  return (
    <>
    <div className="landing-page-container">
      <img className="landing-img" src={landingbg} alt="" />
    </div>
    <div className="landing-text">

      <div className="landing-header">Share what's on your mind!</div>
      <div className="landing-body">Join our community and share your top hobbies, favorite food, your top 10 anime betrayals, or just pictures of your dogs!</div>

      <Link className="join-button" to="/signup">Join for free</Link>

    </div>
    </>
  )
}

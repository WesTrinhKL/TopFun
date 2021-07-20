import React from 'react'
import './LandingPage.css'
import landingbg from '../../images/landingbg2.jpg'
import { useNavbar } from '../../context/NavbarContext'

export const LandingPage = () => {
  const {setNavLandingStyle} = useNavbar();
  setNavLandingStyle("nav-wrapper");
  return (
    <>
    <div className="landing-page-container">
      <img className="landing-img" src={landingbg} alt="" />
    </div>
    </>
  )
}

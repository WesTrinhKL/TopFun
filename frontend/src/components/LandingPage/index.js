import React, {useState, useEffect} from 'react'
import './LandingPage.css'
import landingbg from '../../images/landingbg.jpg'
import landingbg2 from '../../images/landingbg2.jpg'
import landingbg3 from '../../images/signup.jpg'
import landingbg4 from '../../images/doggo2.jfif'
import { useNavbar } from '../../context/NavbarContext'
import { Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

export const LandingPage = () => {
  const {setNavLandingStyle} = useNavbar();
  setNavLandingStyle("nav-wrapper");
  const backgrounds= [ landingbg2, landingbg3, landingbg4];
  const [selectedBackground, setSelectedBackground] = useState(landingbg);
  const [currentIterationBackground, setCurrentIterationBackground] = useState(0);

  const sessionUser = useSelector(state => state.session.user);


  useEffect(()=>{
    setTimeout(function(){
      // console.log("Hello");
      setSelectedBackground(backgrounds[currentIterationBackground]);
      if(currentIterationBackground === backgrounds.length-1) setCurrentIterationBackground(0);
      else{
        setCurrentIterationBackground(currentIterationBackground+1);
      }
    }, 7000);
  },[currentIterationBackground, backgrounds])

  if(sessionUser) return (
    <Redirect to='/HomePage'/>
  )

  return (
    <>
      <div id="display-dark-background" />
      <div className="landing-page-container">
        <img className="landing-img" src={selectedBackground} alt="" />
      </div>
      <div className="landing-text">

        <div className="landing-header">Share what's on your mind!</div>
        <div className="landing-body">Join our community and share your favorite hobbies, food you love, your top 10 anime betrayals, or just pictures of your dogs!</div>

        <Link className="join-button" to="/signup">Join for free</Link>

      </div>
    </>
  )
}

import React, {useState, useEffect} from 'react'
import './LandingPage.css'
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

  const [selectedBackground, setSelectedBackground] = useState(landingbg4);
  const [currentIterationBackground, setCurrentIterationBackground] = useState(0);

  const sessionUser = useSelector(state => state.session.user);


  useEffect(()=>{
    let backgrounds= [ landingbg2, landingbg3, landingbg4];
    let changeBackgroundInterval = setTimeout(function(){
      // console.log("Hello");
      setSelectedBackground(backgrounds[currentIterationBackground]);
      if(currentIterationBackground === backgrounds.length-1) setCurrentIterationBackground(0);
      else{
        setCurrentIterationBackground(currentIterationBackground+1);
      }
    }, 7000);
    return () => {
      clearTimeout(changeBackgroundInterval);
    };
  },[currentIterationBackground])

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

        <div className="plug">
          <div className="plug-content">
            <i className="plug-icon fab fa-github-alt"></i>
              <div className="plug-wrapper">
              <div className="plug-made-by">Made By: </div>
                <a className="plug-link" target="_blank" rel="noopener noreferrer" href="https://github.com/WesTrinhKL/TopFun">Wes Trinh <i className="fas fa-external-link-alt"></i></a>
            </div>
          </div>
        </div>

    </>
  )
}

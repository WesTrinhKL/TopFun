import React,  { useEffect } from 'react'
import './HomePage.css'
import { useNavbar } from '../../context/NavbarContext'
import {useDispatch, useSelector} from 'react-redux';
import { fetchHomeFeed } from '../../store/lists';
import { ListCarousel } from '../ListCarousel';

export const HomePage = () => {
  const {setNavLandingStyle} = useNavbar();


  const dispatch = useDispatch();
  const homepageData = useSelector(state => state.lists.homepageFeedGlobal); //homepageData = array of list obj w/ {users.username, listItemsArray}

  useEffect(()=>{
    dispatch(fetchHomeFeed());
    setNavLandingStyle("nav-wrapper-not-landing");
  },[dispatch, setNavLandingStyle])
  // if(homepageData) console.log("homepage data", homepageData);

  return (
    <div className="homepage-content-container">
      <div className="grid-item-lists" >
          {/* for each item, display list content component here */}
        <div className="feed-menu-dropdown">
          <div>All Feed</div>
          <i className="fas fa-caret-down d-icon"></i>
        </div>
        <div className="all-lists-container">
          {homepageData?.map(list=>(
            <ListCarousel key={list.id} id={list.id} title={list.title} userObj={list.user} listItemsArray={list.listItems} coverPhotoLink={list.coverPhotoLink} listDescription={list.description} />
          ))}
        </div>
      </div>

      {/* <div className="grid-item-people" >
        <div>People With Similar Interests</div>
      </div>
      <div className="grid-item-explore" >
        <div>Explore </div>
      </div>
      <div className="grid-item-footer" >
        <div>Footer </div>
      </div> */}
    </div>
  )
}

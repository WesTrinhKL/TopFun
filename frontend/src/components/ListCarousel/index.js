import  React , {useRef, useState} from 'react'
import { Link, useHistory} from 'react-router-dom';


import './ListCarousel.css';


export const ListCarousel = (props) => {
  const history=useHistory();
  const clickHeaderNavigate = () =>{
    history.push(`/view-list/${props.id}`)
  }


  return (
    <div className="full-item-wrapper">
      <div className="list-item-container">
        <div className="list-title-homepage" onClick={clickHeaderNavigate}>{props.title}</div>
        <div className="author-title-homepage">Made by: {props.userObj.username}</div>
        {/* <img className="image-cover" src={props.coverPhotoLink} alt="img" /> */}
        <div className="content-container-homepage">
          {props.listItemsArray.map(listItem=>(
            <img key={listItem.id} className="image-cover" src={listItem.imageLink} alt="img" />
          ))}
          <div className="list-view-button">
            <Link to={`/view-list/${props.id}`}  className="button-style-list"href="">view full list</Link>
          </div>
        </div>


      </div>

    </div>



  )
}

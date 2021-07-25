import  React , {useRef, useState} from 'react'
import { Link } from 'react-router-dom';


import './ListCarousel.css';


export const ListCarousel = (props) => {


  return (
    <div className="full-item-wrapper">
      <div className="list-item-container">
        <div className="list-title">{props.title}</div>
        <div className="author-title">Made by: {props.userObj.username}</div>
        {/* <img className="image-cover" src={props.coverPhotoLink} alt="img" /> */}
        {props.listItemsArray.map(listItem=>(
          <img key={listItem.id} className="image-cover" src={listItem.imageLink} alt="img" />
        ))}
      </div>
      <Link to={`/view-list/${props.id}`} className="list-view-button" href="">view full list</Link>
    </div>



  )
}

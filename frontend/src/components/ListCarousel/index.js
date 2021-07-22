import  React , {useRef, useState} from 'react'


import './ListCarousel.css';


export const ListCarousel = (props) => {

  // const refFromUseRef = useRef();
  // [increment, setIncrement] = useState(772);
  // [scrollPosition, setScrollPosition] = useState(0);
  // [scrollMax, setScrollMax] =
  // refFromUseRef.current.scrollLeft = 0;

  return (
    <div className="full-item-wrapper">
      <div className="list-item-container">
        <div className="list-title">{props.title}</div>
        <div className="author-title">Made by: {props.userObj.username}</div>
        {/* <img className="image-cover" src={props.coverPhotoLink} alt="img" /> */}
        {props.listItemsArray.map(listItem=>(
          <img className="image-cover" src={listItem.imageLink} alt="img" />
        ))}
      </div>
      <a className="list-view-button" href="">view full list</a>
    </div>



  )
}

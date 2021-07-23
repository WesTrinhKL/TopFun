import  React , {useRef, useState, useEffect} from 'react'


import './ListCarousel.css';


export const ListCarousel = (props) => {

  const refFromUseRef = useRef();
  const [increment, setIncrement] = useState(800);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollMax, setScrollMax] = useState(props.listItemsArray.length * 200 -820 -19);

  console.log(scrollMax);

  useEffect(() => {
    refFromUseRef.current = 0;
    return () => {

    }
  }, [refFromUseRef])


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

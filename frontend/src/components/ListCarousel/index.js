import  React, {useEffect, useRef, useState} from 'react'
import { Link, useHistory} from 'react-router-dom';


import './ListCarousel.css';


export const ListCarousel = (props) => {
  const history=useHistory();
  const clickHeaderNavigate = () =>{
    history.push(`/view-list/${props.id}`)
  }

  const scrollEl = useRef();
  const [incrementVal, setIncrementVal ] = useState(650);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollMax, setScrollMax] = useState(props.listItemsArray.length * 200 - 742 - 5) //length of the whole list minus the container and margin will then yield the remaining list max width that is currently 'invisible'

  useEffect(() => {
    scrollEl.current.scrollLeft = 0;
  }, [])

  const scrollLogicHandler = (direction)=>{
    let inc = incrementVal;
    let pos = scrollPos;

    // Reduce increment if pos at a container edge
    if (pos === 0 || pos === scrollMax) inc -= 34;

    if (direction === "left") inc *= -1;
    pos += inc;

    scrollEl.current.scrollLeft = pos;
    setScrollPos(Math.max(0, Math.min(pos, scrollMax)));
  }

  let leftClass = (scrollPos !== 0) ? "discover-button-container" : "discover-button-container";
  let rightClass = (scrollPos !== scrollMax) ? "discover-button-container" : "discover-button-container ";


  return (
    <div className="full-item-wrapper">
      <div className="list-item-container">
        <div className="list-title-homepage" onClick={clickHeaderNavigate}>{props.title}</div>
        <div className="author-title-homepage">Made by: {props.userObj.username}</div>
        {/* <img className="image-cover" src={props.coverPhotoLink} alt="img" /> */}
        <div className="content-container-homepage">
          <div ref={scrollEl} className="cch__carousel-list">

            <div className="carousel-list__scroll-container">
              {/* duvdd */}
              <div className={leftClass} onClick={() => scrollLogicHandler("left")}>
                <button className="button-carousel" onClick={() => scrollLogicHandler("left")}><i class="fas fa-angle-left"></i></button>
              </div>

              <div className={rightClass} onClick={() => scrollLogicHandler("right")}>
                <button className="button-carousel" onClick={() => scrollLogicHandler("right")}><i class="fas fa-angle-right"></i></button>
              </div>
            </div>

            {/* carousel items */}
            {props.listItemsArray.map(listItem=>(
              <img key={listItem.id} className="image-cover" src={listItem.imageLink} alt="img" />
            ))}
          </div>



          <div className="list-view-button">
            <Link to={`/view-list/${props.id}`}  className="button-style-list"href="">view full list</Link>
          </div>
        </div>


      </div>

    </div>



  )
}

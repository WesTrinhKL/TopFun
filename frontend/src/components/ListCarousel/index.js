import  React, {useEffect, useRef, useState} from 'react'
import { Link, useHistory} from 'react-router-dom';


import './ListCarousel.css';


export const ListCarousel = (props) => {
  const history=useHistory();
  const clickHeaderNavigate = () =>{
    history.push(`/view-list/${props.id}`)
  }

  const scrollEl = useRef(0);
  const [incrementVal, setIncrementVal ] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollMax, setScrollMax] = useState(props.listItemsArray.length * 200 - 742 - 14) //length of the whole list minus the container and margin will then yield the remaining list max width that is currently 'invisible'
  const [carouselContentWidth, setCarouselContentWidth] = useState(0)

  useEffect(() => {
    // scrollEl.current.scrollLeft = 0;
    // useRef selects the element we want from DOM, and set the increment value
    setCarouselContentWidth(scrollEl.current.offsetWidth);
    setIncrementVal(scrollEl.current.offsetWidth);
    console.log("current width of container" , scrollEl)

    const handleResize = ()=> {
      // on resize, update carousel width state to match
      if(scrollEl.current?.offsetWidth) {
        setCarouselContentWidth(scrollEl.current.offsetWidth);
        console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)
  }, [])

  const scrollLogicHandler = (direction)=>{
    let increment = incrementVal;
    let position= scrollPos;

    if (direction === "left") increment *= -1;
    position += increment + 30;

    scrollEl.current.scrollLeft = position;
    setScrollPos(Math.max(0, Math.min(position, scrollMax)));
    // console.log("increment", increment)
    console.log("position", position)
    console.log("scrollmax", scrollMax)
  }

  let leftClass = (scrollPos > 0) ? "discover-button-container" : "discover-button-container hide-scroll";
  let rightClass = (scrollPos < scrollMax && props.listItemsArray.length * 200 > carouselContentWidth) ? "discover-button-container" : "discover-button-container hide-scroll";


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
              {leftClass && <div className={leftClass} onClick={() => scrollLogicHandler("left")}>
                <button className="button-carousel" onClick={() => scrollLogicHandler("left")}><i class="fas fa-angle-left"></i></button>
              </div>}

              {rightClass && <div className={rightClass} onClick={() => scrollLogicHandler("right")}>
                <button className="button-carousel" onClick={() => scrollLogicHandler("right")}><i class="fas fa-angle-right"></i></button>
              </div>}
            </div>

            {/* carousel items */}
            {props.listItemsArray.map(listItem=>(
              <img key={listItem.id} className="image-cover" src={listItem.imageLink} alt="img" />
            ))}
          </div>



          {/* <div className="list-view-button">
            <Link to={`/view-list/${props.id}`}  className="button-style-list"href="">view full list</Link>
          </div> */}
        </div>


      </div>

    </div>



  )
}

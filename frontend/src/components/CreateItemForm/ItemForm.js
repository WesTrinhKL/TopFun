import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateItemForm.css';
import { createItemThunk } from '../../store/lists';
import { useHistory } from 'react-router';



export const ItemForm = ({listId}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const singleListItems = useSelector((state) => state.lists.singleListItems);

  const [title, setTitle] = useState("");
  const [imageLink, setimageLink] = useState("");
  const [content, setcontent] = useState("");
  const [currentRank, setcurrentRank] = useState("1");
  const [extraLink, setextraLink] = useState("");
  const [errors, setErrors] = useState([]);
  const [currentOption, setCurrentOption] = useState(1);

  const onFormSubmitCreateList = (e)=>{
    e.preventDefault();
    if(!sessionUser) history.push('/')
    else{
      const payload = {
        title,
        imageLink,
        content,
        currentRank,
      }
      setErrors([]);
      return dispatch(createItemThunk(payload,listId)).then((data)=>{
        // console.log("item creation returned data: ", data);
        history.push(`/view-list/${listId}`);
        window.location.reload();
      }).catch(async (res) =>{
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors);
      })
    }
  }

  const setTitleE = (e) => setTitle(e.target.value);
  const setimageLinkE = (e) => setimageLink(e.target.value);
  const setcontentE = (e) => setcontent(e.target.value);
  const setcurrentRankE = (e) => setcurrentRank(e.target.value);
  const setExtraLinkE = (e) => setextraLink(e.target.value);


  const next = ()=>{
    switch (currentOption) {
      case 1:{
        // console.log("this is the title", title);
        if(title.length > 0) {
          setCurrentOption(currentOption+1);
          setErrors([]);
        }
        else{
          setErrors(["*Title Required"]);
        }
        break;
      }
      case 2:{
        setCurrentOption(currentOption+1);
        setErrors([]);
        break;
      }
      case 3:{
        // console.log("current hit: ", currentOption);
        if(content.length > 1) {
          // console.log("current content: ", content)
          setCurrentOption(currentOption+1);
          setErrors([]);
        }
        else{
          setErrors(["*Description Required"]);
        }
        break;
      }
      case 4:{
        if(title.length > 0) {
          setCurrentOption(currentOption+1);
          setErrors([]);
        }
        else{
          setErrors(["*Description Required"]);
        }
        break;
      }
      default:
        // setCurrentOption(currentOption+1);
        break;
    }
  }
  const previous = ()=>{
    setCurrentOption(currentOption-1);
    setErrors([]);
  }


  const first = (
    <div className="input-wrapper-item">
      <label className="form-label-spacing-item">
        Title:
      </label>
      <input className="input-box-style"
          placeholder="add a title..."
          required
          value={title}
          onChange={setTitleE}
          type="text" />
    </div>
  )
  const second = (
    <div className="input-wrapper-item">
      <label className="form-label-spacing-item">
        Image Link(Optional):
      </label>
      <div className="cover-photo-preview">
        <img src={imageLink || `https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png`} alt={`can't be found`} />
      </div>
      <input className="input-box-style"
          placeholder="add a link a photo..."
          required
          value={imageLink}
          onChange={setimageLinkE}
          type="text" />
    </div>
  )
  const third = (
    <div className="input-wrapper-item">
      <label className="form-label-spacing-item">
        Description(Required):
      </label>
      <textarea className="input-box-style"
          value={content}
          onChange={setcontentE}
          placeholder="describe your content..."
          type="text" />
    </div>
  )
  const fourth = (
    <div className="input-wrapper-item">
      <label className="form-label-spacing-item">
        Score(Optional):
      </label>
      <input className="input-box-style"
          placeholder="enter a number here..."
          value={currentRank}
          onChange={setcurrentRankE}
          type="number" />
    </div>
  )

  const fifth = (
    <div className="input-wrapper-item">
      <label className="form-label-spacing-item">
        Got a Link?(Optional):
      </label>
      <input className="input-box-style"
          placeholder="https://www.website.com/"
          value={extraLink}
          onChange={setExtraLinkE}
          type="url" />
    </div>
  )


  return (
    <div className="create-form-wrapper-item">
      <form className="form-container-wrapper" onSubmit={onFormSubmitCreateList}>
        <div className="form-container-list-item">

          <div className="form-item-spacing-item title-list"> Add Item To Your List</div>
          <div className="step-text">
            step {currentOption} of 5
          </div>
          <div className="slider-indicator-wrapper">
            <div className={`slider-box ${currentOption===1?'active-slide':'not-active-slide'}`}></div>
            <div className={`slider-box ${currentOption===2?'active-slide':'not-active-slide'}`}></div>
            <div className={`slider-box ${currentOption===3?'active-slide':'not-active-slide'}`}></div>
            <div className={`slider-box ${currentOption===4?'active-slide':'not-active-slide'}`}></div>
            <div className={`slider-box ${currentOption===5?'active-slide':'not-active-slide'}`}></div>
          </div>



          <div className="form-elements-carousel">
            <ul className="error-group-item">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {currentOption===1 && first}
            {currentOption===2 && second}
            {currentOption===3 && third}
            {currentOption===4 && fourth}
            {currentOption===5 && fifth}

          </div>


          <div className="prev-next-container">
            <div className="prev-next-box">
              {currentOption > 1 && <div className="button-style-item" onClick={previous}> Previous</div>}
            </div>
            <div className="prev-next-box">
              {currentOption < 5 && <div className="button-style-item" onClick={next}> Next</div>}
              {currentOption === 5 && <button type="submit" className="button-style-item button-item-submit"> Create</button>}
            </div>

          </div>


          {/* <button type="submit">Add Item to List</button> */}
        </div>
      </form>


    </div>
  )
}

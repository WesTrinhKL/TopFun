import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateItemForm.css';
import { createItemThunk } from '../../store/lists';
import { useHistory } from 'react-router';



export const ItemForm = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleListItems = useSelector((state) => state.lists.singleListItems);

  const [title, setTitle] = useState("");
  const [imageLink, setimageLink] = useState("");
  const [content, setcontent] = useState("");
  const [currentRank, setcurrentRank] = useState("");
  const [errors, setErrors] = useState([]);
  const [currentOption, setCurrentOption] = useState(1);

  const history = useHistory();

  const onFormSubmitCreateList = (e)=>{
    e.preventDefault();
    if(!sessionUser) history.push('/')
    else{
      e.preventDefault();
      const payload = {
        title,
        imageLink,
        content,
        currentRank,
      }
      setErrors([]);
      return dispatch(createItemThunk(payload,1)).then(()=>{
        history.push(`/view-list/1`);
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


  const next = ()=>{
    setCurrentOption(currentOption+1);
  }
  const previous = ()=>{
    setCurrentOption(currentOption-1);
  }


  const first = (
    <div className="input-wrapper">
    <label className="form-item-spacing">
      Title:
      <input
        placeholder="add a title..."
        required
        value={title}
        onChange={setTitleE}
        type="text" />
    </label>
  </div>
  )
  const second = (
    <div>
      step {currentOption} of 4
    </div>
  )
  const third = (
    <div>
      step {currentOption} of 4
    </div>
  )


  return (
    <div className="create-form-wrapper">
      <form className="form-container-list" onSubmit={onFormSubmitCreateList}>
        <ul className="error-group">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-item-spacing title-list"> Add Item To Your List</div>

        <div className="form-elements-carousel">
          {currentOption===1 && first}
          {currentOption===2 && second}
          {currentOption===3 && third}

        </div>


        <div onClick={previous}> Go Previous</div>
        {currentOption < 4 && <div onClick={next}> Go Next</div>}

        {/* <button type="submit">Add Item to List</button> */}

      </form>


    </div>
  )
}

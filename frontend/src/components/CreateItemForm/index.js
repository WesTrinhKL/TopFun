import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateItemForm.css';
import { createItemThunk } from '../../store/lists';
import { useHistory } from 'react-router';



export const CreateItemForm = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleListItems = useSelector((state) => state.lists.singleListItems)

  const [title, setTitle] = useState("");
  const [imageLink, setimageLink] = useState("");
  const [content, setcontent] = useState("");
  const [currentRank, setcurrentRank] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const onFormSubmitCreateList = (e)=>{
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

  return (
    <div className="create-form-wrapper">


      <form className="form-container-list" onSubmit={onFormSubmitCreateList}>
        <ul className="error-group">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-item-spacing title-list"> Add Item To Your List</div>
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

        <div className="input-wrapper">
          <div className="cover-photo-preview">
            <img src={imageLink} alt="img not found" />
          </div>

          <label className="form-item-spacing">
            Image:
            <input
              placeholder="add an Image for your content..."
              required
              value={imageLink}
              onChange={setimageLinkE}
              type="text" />
          </label>
        </div>

        <div className="input-wrapper">
          <label className="form-item-spacing">
            content:
            <textarea
              value={content}
              onChange={setcontentE}
              placeholder="describe your content..."
              type="text" />
          </label>
        </div>

        <div className="input-wrapper">
          <label className="form-item-spacing">
          Add Rating (optional):
          <input
            value={currentRank}
            onChange={setcurrentRankE}
            placeholder="add a rating for this content..."
            type="number" />
          </label>
        </div>

        <button type="submit">Add Item to List</button>

      </form>


    </div>
  )
}

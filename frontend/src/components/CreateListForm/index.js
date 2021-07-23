import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateListForm.css';
import { createListThunk } from '../../store/lists';
import { useHistory } from 'react-router';



export const CreateListForm = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [coverPhotoLink, setCoverPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const onFormSubmitCreateList = (e)=>{
    if(!sessionUser) history.push('/')
    else{
      e.preventDefault();
      const payload = {
        title,
        coverPhotoLink,
        description,
        categoryName,
      }
      setErrors([]);
      // dispatch thunk to sign up
      return dispatch(createListThunk(payload)).then(()=>{
        history.push('/');
      }).catch(async (res) =>{
        const data = await res.json();
        if(data && data.errors) setErrors(data.errors);
      })
    }
  }

  const setTitleE = (e) => setTitle(e.target.value);
  const setCoverPhotoLinkE = (e) => setCoverPhotoLink(e.target.value);
  const setDescriptionE = (e) => setDescription(e.target.value);
  const setCategoryNameE = (e) => setCategoryName(e.target.value);

  return (
    <div className="create-form-wrapper">


      <form className="form-container-list" onSubmit={onFormSubmitCreateList}>
        <ul className="error-group">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-item-spacing title-list"> Create List</div>
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
            <img src={coverPhotoLink} alt="img not found" />
          </div>

          <label className="form-item-spacing">
            Cover Photo:
            <input
              placeholder="add a link a photo..."
              required
              value={coverPhotoLink}
              onChange={setCoverPhotoLinkE}
              type="text" />
          </label>
        </div>

        <div className="input-wrapper">
          <label className="form-item-spacing">
            Description:
            <textarea
              value={description}
              onChange={setDescriptionE}
              placeholder="describe your list..."
              type="text" />
          </label>
        </div>

        <div className="input-wrapper">
          <label className="form-item-spacing">
          Add Category Name:
          <input
            required
            value={categoryName}
            onChange={setCategoryNameE}
            placeholder="add a category for this list..."
            type="text" />
          </label>
        </div>

        <button type="submit">Create Your List</button>

      </form>


    </div>
  )
}

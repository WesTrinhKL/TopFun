import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CreateListForm.css';
import { createListThunk } from '../../store/lists';
import { useHistory } from 'react-router';



export const CreateListForm = () => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const createdListId = useSelector((state) => state.lists.createdList? state.lists.createdList.id: null);

  const [title, setTitle] = useState("");
  const [coverPhotoLink, setCoverPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const onFormSubmitCreateList = async (e)=>{
    e.preventDefault();
    if(!sessionUser) history.push('/')
    else{
      const payload = {
        title,
        coverPhotoLink,
        description,
        categoryName,
      }
      setErrors([]);
      // dispatch thunk to sign up
      return dispatch(createListThunk(payload)).then((data)=>{
        console.log("this is view list data", data);
        history.push(`/view-list/${data.id}`);
      }).catch(async (res) => {
        const data = await res.json();
        console.log("this is the error data", data);
        if (data && data.errors) setErrors(data.errors);
      });
    }
  }

  // return dispatch(createListThunk(payload)).then(async (data)=>{
  //   const responseData = await data.json();
  //   console.log("after list created data returned: ", responseData);
  //   history.push('/');

  const setTitleE = (e) => setTitle(e.target.value);
  const setCoverPhotoLinkE = (e) => setCoverPhotoLink(e.target.value);
  const setDescriptionE = (e) => setDescription(e.target.value);
  const setCategoryNameE = (e) => setCategoryName(e.target.value);

  return (
    <div className="create-form-wrapper">

      <form className="form-container-list" onSubmit={onFormSubmitCreateList}>
        <div className="form-item-spacing title-list"> Create List</div>
        <ul className="error-group">
            {errors.map((error, idx) => <li key={idx}>*{error}</li>)}
        </ul>

        {/* FORM INPUTS */}
        <div className="input-wrapper">
          <label className="form-label-spacing">
            Title:
          </label>
          <input className="input-box-style"
              placeholder="add a title..."
              required
              value={title}
              onChange={setTitleE}
              type="text" />
        </div>

        <div className="input-wrapper">
          <label className="form-label-spacing">
            Cover Photo:
          </label>
          <div className="cover-photo-preview">
            <img src={coverPhotoLink} alt="Can't Find Image" />
          </div>
          <input className="input-box-style"
              placeholder="add a link a photo..."
              required
              value={coverPhotoLink}
              onChange={setCoverPhotoLinkE}
              type="text" />
        </div>

        <div className="input-wrapper">
          <label className="form-label-spacing">
            Description:
          </label>
          <textarea className="input-box-style"
              value={description}
              onChange={setDescriptionE}
              placeholder="describe your list..."
              type="text" />
        </div>

        <div className="input-wrapper">
          <label className="form-label-spacing">
          Add Category Name:
          </label>
          <input className="input-box-style"
            required
            value={categoryName}
            onChange={setCategoryNameE}
            placeholder="add a category for this list..."
            type="text" />
        </div>

        <div className="input-wrapper">
          <button className="submit-list-button" type="submit">Create Your List</button>
        </div>


      </form>


    </div>
  )
}

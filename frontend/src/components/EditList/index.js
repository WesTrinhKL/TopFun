import './EditList.css'
import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListThunk } from '../../store/lists';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';


export const EditList = () => {
  let {id} = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleListItems = useSelector(state=>state.lists.singeListItems);


  const [title, setTitle] = useState(singleListItems.title);
  const [coverPhotoLink, setCoverPhotoLink] = useState(singleListItems.coverPhotoLink);
  const [description, setDescription] = useState(singleListItems.description);
  // fix this later
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const redirectCancel = ()=>{
    history.push(`/view-list/${id}`)
  }

  const onFormSubmitUpdateList = async (e)=>{
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
      return dispatch(updateListThunk(payload,id)).then((data)=>{
        // console.log("this is the updated data", data);
        history.push(`/view-list/${id}`);
      }).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
  }
  const setTitleE = (e) => setTitle(e.target.value);
  const setCoverPhotoLinkE = (e) => setCoverPhotoLink(e.target.value);
  const setDescriptionE = (e) => setDescription(e.target.value);
  const setCategoryNameE = (e) => setCategoryName(e.target.value);

  return (
    <div className="create-form-wrapper">

      <form className="form-container-list" onSubmit={onFormSubmitUpdateList}>
        <div className="form-item-spacing title-list">
        Updating: <span className="updated-title"> {title} </span>
        </div>
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
            <img src={coverPhotoLink || `https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png`} alt="Can't Find" />
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

        <div className="input-wrapper-buttons">
          <div className="cancel-list-button" onClick={redirectCancel}>
            <div className="cancel">Cancel </div>
          </div>
          <button className="submit-list-button" type="submit">Update Your List</button>
        </div>



      </form>


    </div>
  )
}

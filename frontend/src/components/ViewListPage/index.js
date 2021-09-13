import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import './ViewListPage.css'

import {useDispatch ,useSelector } from 'react-redux';
import { fetchSingleListBasedOnId } from '../../store/lists';
import { useHistory } from 'react-router-dom';
import ItemFormModal from '../CreateItemForm';
import EditItemFormModal from '../EditItemForm';

export const ViewListPage = () => {
  let {id} = useParams();
  const dispatch = useDispatch();

  const singleListItems = useSelector(state=>state.lists.singeListItems);
  const sessionUser = useSelector((state) => state.session.user);

  // const [iAmTheUser, setIAmTheUser] = useState(false);

  const history = useHistory();
  const directToEdit = ()=>{ //directs the user to the edit screen for the list
    history.push(`/edit-list/${singleListItems.id}/${singleListItems}`)
  }

  const directToModalEditItem = ()=>{
    // console.log("todo")
  }

  // render these components if user owns post.
  // change to state based later
  let currentUserId
  let iAmTheUserButtonAddItem;
  let iAmTheEditButton = ()=>{};
  if(singleListItems && sessionUser){ //if user owns this list
    currentUserId = sessionUser.id;
    if(currentUserId === singleListItems.userId) {
      iAmTheUserButtonAddItem =  ( //set add item button
        <div className="add-item-button-from-list">
          <ItemFormModal listId={singleListItems.id}/>
          <button className="edit-list-button"  onClick={directToEdit}>Edit List <i className="editicon fas fa-edit"></i></button>
        </div>

      );

      iAmTheEditButton = (listItemDetails)=>{ // set list item button
        // console.log("this is a single list item: ", listItem)
        return (<div className="edit-list-item-button" >
        {/* here we pass the single list item data to the edit modal */}
          <EditItemFormModal  listId={singleListItems.id} listItemDetails={listItemDetails} />
        </div>)
      }


    }
  }

  useEffect(()=>{
    dispatch(fetchSingleListBasedOnId(id));
  },[dispatch,id])

  if (!singleListItems) {
    return null;
  }

  // let singleListItemsReversed = [...singleListItems.listItems].reverse(); //reversing list test


  //thunk to fetch data based on id
  //use selector to grab data from store
  //iterate through data and pass it as prop to SingleListItem component
  //create a button to add list, make sure the list's user belongs to (sessionUser match)
  return (
    <div className="view-list-wrapper">

      <div className="view-container-list">
        {/* <div className="title-list">
          {singleListItems && title}
        </div> */}

        <div className="title-list alt-two">
          <h1>{singleListItems.title}</h1>
        </div>
        <div className="title-author">
         By: {singleListItems.user.username}
        </div>

        {singleListItems && iAmTheUserButtonAddItem}

        <div className="view-list-content-wrapper">
          {/* <div className="view-menu-dropdown">
            <div>Sort By</div>
            <i className="fas fa-caret-down d-icon"></i>
          </div> */}

          {singleListItems && singleListItems.listItems.map((listItem)=>(
            <div key={listItem.id} className="view-item-wrapper">
              <div className="view-item-body-content">
                <div>
                  <img className="view-image-cover" src={listItem.imageLink} alt="img" />
                  <div className="view-external-link">
                  <a href="twitter.com" className="view-external-link-button"> View Link Here <i className="view-external-link-icon fas fa-external-link-alt"></i></a>

                  </div>
                </div>

                <div className="view-title-and-content-wrapper">

                  {/* edit button */}
                  {singleListItems && iAmTheEditButton(listItem)}

                  <div className="view-title-item"> {listItem.title}</div>

                  <div className="view-title-content"> {listItem.content}</div>

                </div>

              </div>



            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

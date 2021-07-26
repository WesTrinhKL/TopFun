import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import './ViewListPage.css'

import {useDispatch ,useSelector } from 'react-redux';
import { fetchSingleListBasedOnId } from '../../store/lists';
import { Link } from 'react-router-dom';
import ItemFormModal from '../CreateItemForm';

export const ViewListPage = () => {
  let {id} = useParams();
  console.log("this is the id value: ", id)
  const dispatch = useDispatch();

  const singleListItems = useSelector(state=>state.lists.singeListItems);
  const sessionUser = useSelector((state) => state.session.user);

  const [iAmTheUser, setIAmTheUser] = useState(false);


  let currentUserId
  let iAmTheUserButtonAddItem;

  if(singleListItems && sessionUser){
    currentUserId = sessionUser.id;
    if(currentUserId === singleListItems.userId) {
      iAmTheUserButtonAddItem =  (
        <div className="add-item-button-from-list">
          <ItemFormModal listId={singleListItems.id}/>
        </div>
      )
    }
  }

  useEffect(()=>{
    dispatch(fetchSingleListBasedOnId(id));
  },[dispatch])

  if (!singleListItems) {
    return null;
  }

  let singleListItemsReversed = [...singleListItems.listItems].reverse();
  console.log("reversed" , singleListItemsReversed)


  // let title;
  // if(iAmTheUser){
  //   title = (
  //     <>
  //       Viewing Your List!
  //     </>
  //   )
  // }
  // else if (singleListItems) {
  //   title = (
  //     <>
  //       Viewing List!
  //     </>
  //   )
  // }

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
          <h1>List Title</h1>
        </div>
        <div className="title-author">
         author goes here
        </div>

        {singleListItems && iAmTheUserButtonAddItem}

        <div className="view-list-content-wrapper">
          <div className="view-menu-dropdown">
            <div>Sort By</div>
            <i className="fas fa-caret-down d-icon"></i>
          </div>

          {singleListItems && singleListItemsReversed.map(listItem=>(
            <div className="view-item-wrapper">
              <div className="view-item-body-content">
                <div>
                  <img className="view-image-cover" src={listItem.imageLink} alt="img" />
                  <div className="view-external-link">
                  <a href="" className="view-external-link-button"> View Link Here <i className="view-external-link-icon fas fa-external-link-alt"></i></a>

                  </div>
                </div>

                <div className="view-title-and-content">
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

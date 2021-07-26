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
        <div className="title-list">
          List Items title Go Here
        </div>
        <div className="title-author">
         author goes here
        </div>
        <div>
            {singleListItems && iAmTheUserButtonAddItem}
        </div>
        <div className="list-wrapper">

          {singleListItems && singleListItemsReversed.map(listItem=>(
            <div className="item-wrapper">
              <img className="image-cover" src={listItem.imageLink} alt="img" />
              <div className="title-and-content">
                <div> {listItem.title}</div>
                <div> {listItem.content}</div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

import React from 'react';
import { useParams } from 'react-router';
import './ViewListPage.css'

export const ViewListPage = () => {
  let {id} = useParams();
  //thunk to fetch data based on id
  //use selector to grab data from store
  //iterate through data and pass it as prop to SingleListItem component
  //create a button to add list, make sure the list's user belongs to (sessionUser match)
  return (
    <div className="view-list-wrapper">
      <div className="view-container-list">
        <div className="title-list">
          Viewing 'name' List: {id}
        </div>
        <div>
          List Items Go Here
        </div>
      </div>

    </div>
  )
}

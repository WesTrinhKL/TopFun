import React from 'react'
import './CreateListButton.css'
import { useHistory } from 'react-router'

export const CreateListButton = ({sessionUser}) => {
  const history= useHistory();
  const openCreateList = () =>{
    console.log("button is working");
    history.push('/create-list')
    return;
  }

  return (
    <div className="create-list-button-wrapper">
      <div className="create-list-button" onClick={openCreateList}>
        <i className="fas fa-plus-square upload-icon"></i>
      </div>
    </div>
  )
}

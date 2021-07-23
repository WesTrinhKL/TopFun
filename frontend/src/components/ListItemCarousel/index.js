import React from 'react'
import Link from 'react-router-dom';


export const ListItemCarousel = ({listItem}) => {
  return (
    <div>
        <img className="image-cover" src={listItem.imageLink} alt="img" />
    </div>
  )
}

import React from 'react'
import "./OverViewTileTwo.css"
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OverViewTileTwoBox = ({id, title, details }) => {
  const navigate = useNavigate();
  return (
    <div className="OverViewTileTwoBox-container">
      <h1 className='container-title'>{title}</h1>
      <p className='container-content'>{details}</p>
      <input className="moredetailsBtn" type="button" value="MORE DETAILS >"
        onClick={() => {
        navigate(`viewClients/client-detail/id/campaignDetailsPage/${id}`);
        }}
      />
    </div>
  )
}

export default OverViewTileTwoBox

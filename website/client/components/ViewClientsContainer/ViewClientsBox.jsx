import React from 'react';
import './ViewClientsBox.css';
import { useNavigate } from 'react-router-dom';
const ViewClientsBox = ({ imgSrc, clientName, clientId, setActiveTab }) => {


  const navigate = useNavigate();

  return (
    <div className="viewClientsBox-container">
      <img src={imgSrc} alt={clientName} className="clientImage" />
      <h3>{clientName}</h3>
      <input
        type="button"
        value="More Details >"
        className="detailsBtn"
        onClick={() => navigate(`client-detail/${clientId}`)}
      />
    </div>
  );
};

export default ViewClientsBox;
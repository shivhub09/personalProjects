import React from 'react';
import './ViewCampaignsBox.css';
import { useNavigate } from 'react-router-dom';

const ViewCampaignsBox = ({ campaign, url, campaignId }) => {

  const navigate = useNavigate();

  return (
    <div className="viewCampaignsBox">
      <img src={url} alt={campaign.title} className="campaignImage" />
      <div className="campaignDetails">
        <h3>{campaign.title}</h3>
        <input
          type="button"
          value="More Details >"
          className="detailsBtn"
          onClick={() => {
            navigate(`campaignDetailsPage/${campaignId}`);
          }}
        />
      </div>
    </div>
  );
};

export default ViewCampaignsBox;






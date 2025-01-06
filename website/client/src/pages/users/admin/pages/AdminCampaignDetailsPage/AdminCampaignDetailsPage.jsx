import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate from react-router-dom
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import CampaignDetailsBox from '../../../../../components/CampaignDetailsBoxes/CampaignDetailsBox';
import './AdminCampaignDetailsPage.css';
import CampaignDeleteBox from '../../../../../components/CampaignDetailsBoxes/CampaignDeleteBox';

const AdminCampaignDetailsPage = ({  setActiveTab }) => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const {campaignId} = useParams();

  useEffect(() => {
    // This effect will navigate back to the previous page when the component mounts
    const handlePopState = () => {
      // Use navigate(-1) to go back in the browser history
      navigate(-1);
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="campaign-details-container">
      <PageTitle title="Campaign Details" />
      <div className="campaign-details-boxes">
        <div className="row">
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/4074/4074958.png"
            title="CREATE FORM"
            url="create-form"
            // setActiveTab={setActiveTab}
            campaignId={campaignId}
          />
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/9316/9316720.png"
            title="VIEW FORMS"
            url="view-all-forms"
            setActiveTab={setActiveTab}
            campaignId={campaignId}
          />
          <CampaignDeleteBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/2723/2723639.png"
            title="DELETE CAMPAIGN"
            campaignId={campaignId}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCampaignDetailsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewCampaignsContainer.css";
import ViewCampaignsBox from "./ViewCampaignsBox";

const ViewCampaignsContainer = ({ setActiveTab }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {clientId} = useParams();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/fetchAllCampaigns",
          { clientId }
        );
        setCampaigns(response.data.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [clientId]);

  const handleDeleteClient = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/admin/deleteClient",
        {
          data: { clientId },
        }
      );

      if (response.status === 200) {
        alert("Client deleted successfully.");
        setActiveTab("viewClients");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="viewCampaignsContainer">
      <input
        className="newCampaignBtn"
        type="button"
        value="Create New Campaign"
        onClick={() => setActiveTab(`createNewCampaign/${clientId}`)}
      />
      <input
        className="deleteClientBtn"
        type="button"
        value="Delete Client"
        onClick={handleDeleteClient}
      />

      <div className="allCampaignsContainer">
        {campaigns.map((campaign) => (
          <ViewCampaignsBox
            key={campaign._id}
            url={campaign.campaignLogo}
            campaign={campaign}
            campaignId={campaign._id}
            // setActiveTab={setActiveTab}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewCampaignsContainer;

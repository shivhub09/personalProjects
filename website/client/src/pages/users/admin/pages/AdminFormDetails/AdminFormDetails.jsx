import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../../../../../components/PageTitles/PageTitle";
import "./AdminFormDetails.css";
import FormBox from "../../../../../components/FormBox/FormBox";

const AdminFormDetails = ({ campaignId, setActiveTab }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/fetchFormsForGivenClient",
          { campaignId }
        );
        setForms(response.data.data.reverse());
        setLoading(false);
      } catch (err) {
        setError("Error fetching forms.");
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchForms();
    }
  }, [campaignId]);

  return (
    <div className="form-details">
      <PageTitle title="All Forms Details" />
      <div className="form-details-container">
        {loading ? (
          <p>Loading forms...</p>
        ) : error ? (
          <p>{error}</p>
        ) : forms.length > 0 ? (
          forms.map((form) => (
            <FormBox
              key={form._id}
              formId={form._id}
              form={form}
              setActiveTab={setActiveTab}
            />
          ))
        ) : (
          <p>No forms available for this campaign.</p>
        )}
      </div>
    </div>
  );
};

export default AdminFormDetails;

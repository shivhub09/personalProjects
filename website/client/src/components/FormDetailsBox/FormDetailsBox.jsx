import React from 'react';
import './FormDetailsBox.css';
import { useNavigate, useParams } from 'react-router-dom';

const FormDetailsBox = ({ formId, title, imgSrc, url }) => {
  const navigate = useNavigate();

  console.log(formId);
  

  const handleNextClick = () => {
    if (url === "createNestedForm") {
      navigate(`/admin/createNestedForm/${formId}`)
    } else if(url==="viewNestedFormData"){
      navigate(`viewNestedFormData`)
    }
    
    else {
      navigate(`/admin/${url}/${formId}`);
    }

    // Ensure the correct URL structure
  };

  return (
    <div className='form-detail-box'>
      <div className="icon-box">
        <img src={imgSrc} alt="" />
      </div>
      <input type="button" className='detailsBtn' value={title} onClick={() => {
        console.log(formId);
        handleNextClick();
      }} />
    </div>
  );
};

export default FormDetailsBox;
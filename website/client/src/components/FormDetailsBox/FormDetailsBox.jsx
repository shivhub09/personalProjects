import React from 'react';
import './FormDetailsBox.css';
import { useNavigate } from 'react-router-dom';

const FormDetailsBox = ({ formId, title, imgSrc, url }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
      // Ensure the correct URL structure
      navigate(`/admin/${url}/${formId}`);
  };

  return (
    <div className='form-detail-box'>
      <div className="icon-box">
        <img src={imgSrc} alt="" />
      </div>
      <input type="button" className='detailsBtn' value={title} onClick={()=>{
        console.log(formId);
        handleNextClick();
      }} />
    </div>
  );
};

export default FormDetailsBox;

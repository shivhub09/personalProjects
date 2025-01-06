import React from 'react';
import './FormBox.css';
import { useNavigate } from 'react-router-dom';
const FormBox = ({ form,formId}) => {
    const navigate =    useNavigate();
    return (
        <div className="formBox">
            <h3>{form.collectionName}</h3> {/* Displaying the form's title */}
            <h4>{formId}</h4> {/* Displaying the form's title */}
            <input 
                type="button" 
                className="detailsBtn" 
                value="More Info" 
                onClick={() => {
                    console.log(form._id);
                    navigate(`viewFormData/${form._id}`)}} 
            />
        </div>
    );
};

export default FormBox;

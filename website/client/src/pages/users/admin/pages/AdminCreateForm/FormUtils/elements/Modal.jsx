import React, { useEffect } from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ message, onClose, formId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [navigate, onClose, formId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <p>Routing to Assign Promoters...</p>
      </div>
    </div>
  );
};

export default Modal;

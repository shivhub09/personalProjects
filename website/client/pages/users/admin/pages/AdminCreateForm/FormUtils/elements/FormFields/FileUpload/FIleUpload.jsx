import React from 'react';
import './FileUpload.css';

const FileUpload = () => {
  return (
    <div className="fileUpload-container">
      <input type="text" className="fileUpload-title" placeholder="Enter File title" />
      <input type="file" className='fileUpload-input' id="fileUpload" />
      <label htmlFor="fileUpload" className="fileUpload-label">Choose a file</label>
    </div>
  );
}

export default FileUpload;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Image.css';

const Image = ({ fullNameDataList = [], setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this instance
  const [imagePreview, setImagePreview] = useState(null);

  const handleBlur = (event) => {
    const title = event.target.value.trim();

    if (title) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(componentId, title, 'Image');
      } else {
        // Create a new entry
        setFullNameData(componentId, title, 'Image');
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);

        const title = `Image (${file.name})`; // Default title for the image
        const existingEntry = fullNameDataList.find(
          (entry) => entry.uniqueId === componentId
        );

        if (existingEntry) {
          // Update the existing entry
          setFullNameData(componentId, existingEntry.title || title, 'Image');
        } else {
          // Create a new entry
          setFullNameData(componentId, title, 'Image');
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Image', text: 'Image' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className={`imagePicker-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      <input
        type="text"
        className="imagePicker-title"
        placeholder="Enter Image Title"
        name="imagePickerTitle"
        onBlur={handleBlur}
      />
      <input
        type="file"
        id={`imageUpload-${componentId}`}
        accept="image/*"
        onChange={handleImageUpload}
        className="imagePicker-input"
      />
      <label htmlFor={`imageUpload-${componentId}`} className="imagePicker-label">
        Choose an Image
      </label>
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" className="image-preview-img" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Image);

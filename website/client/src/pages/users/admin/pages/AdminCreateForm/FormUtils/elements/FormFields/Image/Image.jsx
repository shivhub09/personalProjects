import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Image.css';

const Image = ({ fullNameDataList, setFullNameData }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleBlur = (event) => {
    if (event.target.value.trim()){
      const id = uuidv4();
      setFullNameData(id, event.target.value, 'Image',null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        const id = uuidv4();
        setFullNameData(id, file.name, 'Uploaded Image',null);
      };
      reader.readAsDataURL(file);
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Image', text: 'Image' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="imagePicker-container" ref={dragRef}>
      <input
        type="text"
        className="imagePicker-title"
        placeholder="Enter Image Title"
        name="imagePickerTitle"
        onBlur={handleBlur}
      />
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
        className="imagePicker-input"
      />
      <label htmlFor="imageUpload" className="imagePicker-label">
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

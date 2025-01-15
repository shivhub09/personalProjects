import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Image.css';

const Image = ({ fullNameDataList, setFullNameData }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Image');
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
      <input type="text" className="imagePicker-title" placeholder="Enter Image Title"  name="imagePickerTitle" 
      onKeyDown={handleKeyPress} />
      <input type="image" className='imagePicker-input' id="imageUpload" />
      <label htmlFor="imageUpload" className="imagePicker-label">Choose an Image</label>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};


export default connect(mapStateToProps, mapDispatchToProps)(Image);

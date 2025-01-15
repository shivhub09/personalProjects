import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './ShortText.css'
const ShortText = ({ fullNameDataList, setFullNameData }) => {

  const handleBlur = (event) => {
    if (event.target.value.trim()){
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Short Text');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Short Text', text: 'Short Text' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="shortText-container" ref={dragRef}>
      <input 
      type="text" 
      placeholder="Enter the text" className="shortText-title"
      name="shortTextTitle"
      onBlur={handleBlur}
       />

      <input type="text"  className="shortText-input" />
    </div>
  )
}

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};


export default connect(mapStateToProps, mapDispatchToProps)(ShortText)

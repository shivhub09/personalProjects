import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './LongText.css'
const LongText = ({ fullNameDataList, setFullNameData }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Long Text');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Long Text', text: 'Long Text' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);


  return (
    <div className="longText-container"  ref={dragRef}>
      <input 
      type="text" 
      className="longText-title" 
      placeholder='Long Text'
      name="longTextTitle" 
      onKeyDown={handleKeyPress}

      
      />
      <textarea name="" className="longTextinput" id="" cols="50"></textarea>
      
    </div>
  )
}


const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};


export default connect(mapStateToProps, mapDispatchToProps)(LongText)
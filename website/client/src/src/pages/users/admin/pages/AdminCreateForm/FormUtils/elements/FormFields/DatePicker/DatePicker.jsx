import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './DatePicker.css'
const DatePicker = ({ fullNameDataList, setFullNameData }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Date Picker');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Date Picker', text: 'Date Picker' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);


  return (
    <div className="datePicker-container" ref={dragRef}>
      <input type="text" name="datePickerTitle" 
      onKeyDown={handleKeyPress} className='datePicker-title' placeholder='Pick a Date' id="" />

      <input type="date" name="" className='dateTimeInput' id="" />
    </div>
  )
}


const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};
export default connect(mapStateToProps, mapDispatchToProps)(DatePicker) 

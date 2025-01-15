import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './DatePicker.css';

const DatePicker = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this component instance

  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId // Match by this component's unique ID
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(existingEntry.uniqueId, inputValue, 'Date Picker');
      } else {
        // Create a new entry
        setFullNameData(componentId, inputValue, 'Date Picker');
      }
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Date Picker', text: 'Date Picker' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className={`datePicker-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      <input
        type="text"
        name="datePickerTitle"
        className="datePicker-title"
        placeholder="Pick a Date"
        onBlur={handleBlur} // Trigger save on losing focus
      />
      <input
        type="date"
        className="dateTimeInput"
        onBlur={handleBlur} // Trigger save on losing focus for date selection
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

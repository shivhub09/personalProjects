import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Appointment.css';

const Appointment = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this component instance

  // Handle input blur to save or update data in Redux store
  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();

    if (inputValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId // Match by this component's unique ID
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(existingEntry.uniqueId, inputValue, 'Appointment');
      } else {
        // Create a new entry
        setFullNameData(componentId, inputValue, 'Appointment');
      }
    }
  };

  // Log the Redux data for debugging
  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  // Drag-and-drop configuration
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Appointment', text: 'Appointment' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={`appointment-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      {/* Input for appointment title */}
      <div className="appointment-title-container">
        <input
          type="text"
          name="appointmentTitle"
          className="appointment-title"
          placeholder="Select an Appointment"
          onBlur={handleBlur} // Trigger save on losing focus
        />
      </div>

      {/* Input for date and time */}
      <div className="appointment-datetime-container">
        <input
          type="datetime-local"
          className="datetime-input"
          name="appointmentDatetime"
        />
        <label className="datetime-label">Select Date and Time</label>
      </div>
    </div>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

// Map Redux actions to component props
const mapDispatchToProps = {
  setFullNameData,
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Appointment);

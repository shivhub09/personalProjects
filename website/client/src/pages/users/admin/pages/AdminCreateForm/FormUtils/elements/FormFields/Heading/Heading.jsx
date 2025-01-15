import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Heading.css';

const Heading = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this component instance

  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();

    if (inputValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId // Match by this component's unique ID
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(existingEntry.uniqueId, inputValue, 'Heading');
      } else {
        // Create a new entry
        setFullNameData(componentId, inputValue, 'Heading');
      }
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Heading', text: 'Heading' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className={`heading-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      <input
        type="text"
        className="input-heading"
        name="headingTitle"
        placeholder="Heading"
        onBlur={handleBlur} // Trigger save on losing focus
      />
      <input
        type="text"
        className="input-subHeading"
        placeholder="Sub Heading"
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

export default connect(mapStateToProps, mapDispatchToProps)(Heading);

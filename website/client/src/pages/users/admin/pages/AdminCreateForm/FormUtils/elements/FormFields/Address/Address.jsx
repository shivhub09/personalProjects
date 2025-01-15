import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Address.css';

const Address = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this component instance

  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();

    if (inputValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId // Match by this component's unique ID
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(existingEntry.uniqueId, inputValue, 'Address');
      } else {
        // Create a new entry
        setFullNameData(componentId, inputValue, 'Address');
      }
    }
  };

  const handleFocus = (event) => {
    const existingEntry = fullNameDataList.find(
      (entry) => entry.uniqueId === componentId // Match by this component's unique ID
    );

    if (existingEntry) {
      event.target.value = existingEntry.title; // Populate input with existing data
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Address', text: 'Address' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="address-container" ref={dragRef}>
      <div className="address-title-container">
        <input
          type="text"
          name="addressTitle"
          className="address-container-title"
          placeholder="Address"
          onBlur={handleBlur} // Trigger save on losing focus
          onFocus={handleFocus} // Populate field on focus
        />
      </div>

      <input
        type="text"
        className="street-address-input"
        placeholder="Street Address"
        onBlur={handleBlur}
      />
      <input
        type="text"
        className="street-address-input-line2"
        placeholder="Street Address Line 2"
        onBlur={handleBlur}
      />

      <div className="city-state">
        <div className="city-box">
          <input
            type="text"
            className="city-input"
            placeholder="City"
            onBlur={handleBlur}
          />
        </div>

        <div className="state-box">
          <input
            type="text"
            className="state-input"
            placeholder="State/Province"
            onBlur={handleBlur}
          />
        </div>
      </div>

      <input
        type="text"
        className="pincode-input"
        placeholder="Pincode/Zip Code"
        onBlur={handleBlur}
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);

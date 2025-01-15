import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './LongText.css';

const LongText = ({ fullNameDataList = [], setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this instance

  const handleBlur = (event) => {
    const textValue = event.target.value.trim();

    if (textValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(
          componentId,
          { ...existingEntry.data, text: textValue },
          'Long Text'
        );
      } else {
        // Create a new entry
        setFullNameData(componentId, { text: textValue }, 'Long Text');
      }
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Long Text', text: 'Long Text' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className={`longText-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      <input
        type="text"
        className="longText-title"
        placeholder="Long Text"
        name="longTextTitle"
        onBlur={handleBlur}
      />
      <textarea
        name="longTextContent"
        className="longTextinput"
        id=""
        cols="50"
        rows="5"
      ></textarea>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LongText);

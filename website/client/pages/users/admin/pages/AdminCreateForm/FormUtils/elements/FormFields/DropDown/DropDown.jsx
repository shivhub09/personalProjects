import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid'; 
import './DropDown.css';

const DropDown = ({ fullNameDataList, setFullNameData }) => {
  const [inputFields, setInputFields] = useState([]);
  const [dropdownTitle, setDropdownTitle] = useState('');

  const addInputField = () => {
    setInputFields([...inputFields, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;
    setInputFields(newInputFields);
  };

  const handleSubmit = () => {
    console.log('Dropdown Title:', dropdownTitle);
    console.log('Form Data:', inputFields);

    let totalFields = inputFields.join(',');

    console.log('Total Fields:', totalFields);

    const id = uuidv4(); // Generate a unique ID
    let finalSubmission = dropdownTitle + "," + totalFields;
    console.log('Final Submission:', finalSubmission);

    setFullNameData(id, finalSubmission, 'Drop Down');
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'DropDown', text: 'Drop Down' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="dropDown-container" ref={dragRef}>
      <input
        type="text"
        className="dropDown-title"
        placeholder="Drop Down"
        value={dropdownTitle}
        onChange={(e) => setDropdownTitle(e.target.value)}
      />

      {inputFields.map((field, index) => (
        <div key={index} className="input-group">
          <input
            type="text"
            className="dynamic-input"
            placeholder={`Enter text ${index + 1}`}
            value={field}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}

      <button onClick={addInputField} className="add-input-btn">
        Add Input
      </button>
      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);

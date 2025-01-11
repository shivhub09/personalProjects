import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx'; // Import XLSX library for reading Excel files
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert sheet to JSON array

        const names = jsonData.flat(); // Flatten the array in case of multiple rows
        setInputFields(names.filter((name) => typeof name === 'string' && name.trim() !== '')); // Filter valid names
      };
      reader.readAsArrayBuffer(file);
    }
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

      <div className="file-upload">
        <label htmlFor="fileInput">Upload Excel File:</label>
        <input
          type="file"
          id="fileInput"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>
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

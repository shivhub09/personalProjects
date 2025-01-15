// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { useDrag } from 'react-dnd';
// import { setFullNameData } from '../actions/fullNameActions';
// import { v4 as uuidv4 } from 'uuid';
// import * as XLSX from 'xlsx'; // Import XLSX library for reading Excel files
// import './DropDown.css';

// const DropDown = ({ fullNameDataList, setFullNameData }) => {
//   const [inputFields, setInputFields] = useState([]);
//   const [dropdownTitle, setDropdownTitle] = useState('');

//   const addInputField = () => {
//     setInputFields([...inputFields, '']);
//   };

//   const handleInputChange = (index, value) => {
//     const newInputFields = [...inputFields];
//     newInputFields[index] = value;
//     setInputFields(newInputFields);
//   };

//   const handleSubmit = () => {
//     console.log('Dropdown Title:', dropdownTitle);
//     console.log('Form Data:', inputFields);

//     let totalFields = inputFields.join(',');

//     console.log('Total Fields:', totalFields);

//     const id = uuidv4(); // Generate a unique ID
//     let finalSubmission = dropdownTitle + "," + totalFields;
//     console.log('Final Submission:', finalSubmission);

//     setFullNameData(id, finalSubmission, 'Drop Down', {"name":["shivam", "falu"], "surname":["nagori","nagori"]});
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Convert sheet to JSON array

//         const names = jsonData.flat(); // Flatten the array in case of multiple rows
//         setInputFields(names.filter((name) => typeof name === 'string' && name.trim() !== '')); // Filter valid names
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const [{ isDragging }, dragRef] = useDrag({
//     type: 'item',
//     item: { id: uuidv4(), type: 'DropDown', text: 'Drop Down' },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   useEffect(() => {
//     console.log('Full Name Data List:', fullNameDataList);
//   }, [fullNameDataList]);

//   return (
//     <div className="dropDown-container" ref={dragRef}>
//       <input
//         type="text"
//         className="dropDown-title"
//         placeholder="Drop Down"
//         value={dropdownTitle}
//         onChange={(e) => setDropdownTitle(e.target.value)}
//       />

//       {inputFields.map((field, index) => (
//         <div key={index} className="input-group">
//           <input
//             type="text"
//             className="dynamic-input"
//             placeholder={`Enter text ${index + 1}`}
//             value={field}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//           />
//         </div>
//       ))}

//       <button onClick={addInputField} className="add-input-btn">
//         Add Input
//       </button>
//       <button onClick={handleSubmit} className="submit-btn">
//         Submit
//       </button>

//       <div className="file-upload">
//         <label htmlFor="fileInput">Upload Excel File:</label>
//         <input
//           type="file"
//           id="fileInput"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//         />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   fullNameDataList: state.fullName.fullNameDataList,
// });

// const mapDispatchToProps = {
//   setFullNameData,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DropDown);


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import './DropDown.css';

const DropDown = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for the component
  const [dropdownData, setDropdownData] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [dropdownTitle, setDropdownTitle] = useState('');

  // Handle Excel File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const hierarchy = jsonData.reduce((acc, row) => {
          const [grandparent, parent, child] = row;
          if (!acc[grandparent]) acc[grandparent] = {};
          if (parent) {
            if (!acc[grandparent][parent]) acc[grandparent][parent] = [];
            if (child) acc[grandparent][parent].push(child);
          }
          return acc;
        }, {});

        setDropdownData(hierarchy);

        // Dispatch to Redux and backend
        setFullNameData(componentId, dropdownTitle, 'Drop Down', hierarchy);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle Dropdown Changes
  const handleSelectionChange = (level, value) => {
    const newSelectedValues = { ...selectedValues, [level]: value };
    // Clear dependent levels if parent changes
    if (level === 'grandparent') delete newSelectedValues['parent'];
    if (level === 'parent') delete newSelectedValues['child'];
    setSelectedValues(newSelectedValues);
  };

  // Save or Update Data on Blur
  const onClick = () => {
    if (dropdownTitle.trim()) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId
      );

      const dataToSave = {
        id: componentId,
        title: dropdownTitle,
        type: 'Drop Down',
        options: dropdownData, // Save the parsed Excel data too
      };

      if (existingEntry) {
        // Update existing entry
        setFullNameData(dataToSave);
      } else {
        // Create a new entry
        setFullNameData(dataToSave);
      }
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'Drop Down', text: 'Drop Down' },
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
        placeholder="Drop Down Title"
        value={dropdownTitle}
        onChange={(e) => setDropdownTitle(e.target.value)}
        // onBlur={handleBlur} // Save title on blur
      />
      <button onClick={onClick}>SUbmit here </button>

      <div className="dropdown-group">
        {/* Grandparent Dropdown */}
        <select
          value={selectedValues.grandparent || ''}
          onChange={(e) => handleSelectionChange('grandparent', e.target.value)}
        >
          <option value="">Select Grandparent</option>
          {Object.keys(dropdownData).map((grandparent) => (
            <option key={grandparent} value={grandparent}>
              {grandparent}
            </option>
          ))}
        </select>

        {/* Parent Dropdown */}
        {selectedValues.grandparent && (
          <select
            value={selectedValues.parent || ''}
            onChange={(e) => handleSelectionChange('parent', e.target.value)}
          >
            <option value="">Select Parent</option>
            {Object.keys(dropdownData[selectedValues.grandparent] || {}).map(
              (parent) => (
                <option key={parent} value={parent}>
                  {parent}
                </option>
              )
            )}
          </select>
        )}

        {/* Child Dropdown */}
        {selectedValues.parent && (
          <select
            value={selectedValues.child || ''}
            onChange={(e) => handleSelectionChange('child', e.target.value)}
          >
            <option value="">Select Child</option>
            {(dropdownData[selectedValues.grandparent]?.[selectedValues.parent] ||
              []).map((child) => (
              <option key={child} value={child}>
                {child}
              </option>
            ))}
          </select>
        )}
      </div>

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
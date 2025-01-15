// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { useDrag } from 'react-dnd';
// import { setFullNameData } from '../actions/fullNameActions';
// import { v4 as uuidv4 } from 'uuid';
// import './MultipleChoice.css';

// const MultipleChoice = ({ fullNameDataList, setFullNameData }) => {
//   const [componentId] = useState(uuidv4()); // Unique ID for this component instance
//   const [title, setTitle] = useState(''); // Title of the multiple choice
//   const [options, setOptions] = useState([]); // List of options
//   const [selectedOptions, setSelectedOptions] = useState(new Set()); // Track selected options

//   const handleBlurTitle = () => {
//     if (title.trim()) {
//       const existingEntry = fullNameDataList.find(
//         (entry) => entry.uniqueId === componentId
//       );

//       if (existingEntry) {
//         setFullNameData(componentId, { ...existingEntry, title: title.trim() }, 'MultipleChoice');
//       } else {
//         setFullNameData(componentId, { title: title.trim(), options, selectedOptions: Array.from(selectedOptions) }, 'MultipleChoice');
//       }
//     }
//   };

//   const addOption = () => {
//     setOptions([...options, '']);
//   };

//   const updateOption = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index] = value;
//     setOptions(updatedOptions);

//     const existingEntry = fullNameDataList.find((entry) => entry.uniqueId === componentId);
//     if (existingEntry) {
//       setFullNameData(componentId, { ...existingEntry, options: updatedOptions }, 'MultipleChoice');
//     }
//   };

//   const removeOption = (index) => {
//     const updatedOptions = options.filter((_, i) => i !== index);
//     setOptions(updatedOptions);

//     const updatedSelected = new Set(selectedOptions);
//     updatedSelected.delete(options[index]);
//     setSelectedOptions(updatedSelected);

//     const existingEntry = fullNameDataList.find((entry) => entry.uniqueId === componentId);
//     if (existingEntry) {
//       setFullNameData(componentId, { ...existingEntry, options: updatedOptions, selectedOptions: Array.from(updatedSelected) }, 'MultipleChoice');
//     }
//   };

//   const toggleSelection = (option) => {
//     const updatedSelected = new Set(selectedOptions);
//     if (updatedSelected.has(option)) {
//       updatedSelected.delete(option);
//     } else {
//       updatedSelected.add(option);
//     }
//     setSelectedOptions(updatedSelected);

//     const existingEntry = fullNameDataList.find((entry) => entry.uniqueId === componentId);
//     if (existingEntry) {
//       setFullNameData(componentId, { ...existingEntry, selectedOptions: Array.from(updatedSelected) }, 'MultipleChoice');
//     }
//   };

//   const [{ isDragging }, dragRef] = useDrag({
//     type: 'item',
//     item: { id: componentId, type: 'MultipleChoice', text: 'Multiple Choice' },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   useEffect(() => {
//     console.log('Full Name Data List:', fullNameDataList);
//   }, [fullNameDataList]);

//   return (
//     <div className={`multipleChoice-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
//       <input
//         type="text"
//         className="multipleChoicetitle-container"
//         placeholder="Multiple Choice Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         onBlur={handleBlurTitle}
//       />
//       <div className="multipleChoice-options">
//         {options.map((option, index) => (
//           <div key={index} className="multipleChoice-option">
//             <input
//               type="checkbox"
//               checked={selectedOptions.has(option)}
//               onChange={() => toggleSelection(option)}
//               disabled={!option.trim()} // Disable checkbox for empty options
//             />
//             <input
//               type="text"
//               placeholder={`Option ${index + 1}`}
//               value={option}
//               onChange={(e) => updateOption(index, e.target.value)}
//             />
//             <button className="remove-option-btn" onClick={() => removeOption(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//       <button className="add-option-btn" onClick={addOption}>
//         Add Option
//       </button>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   fullNameDataList: state.fullName.fullNameDataList,
// });

// const mapDispatchToProps = {
//   setFullNameData,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);



import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './MultipleChoice.css';

const MultipleChoice = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4());
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const saveData = () => {
    const data = {
      id: componentId,
      title: title.trim(),
      options: options.filter((option) => option.trim() !== ''),
      selectedOptions,
    };

    const existingEntry = fullNameDataList.find((entry) => entry.id === componentId);

    if (existingEntry) {
      setFullNameData(componentId, data);
    } else {
      setFullNameData(componentId, data);
    }
  };

  const handleBlurTitle = () => {
    if (title.trim()) {
      saveData();
    }
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    saveData();
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);

    const updatedSelectedOptions = selectedOptions.filter(
      (selected) => selected !== options[index]
    );
    setSelectedOptions(updatedSelectedOptions);
    saveData();
  };

  const toggleSelection = (option) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedSelectedOptions);
    saveData();
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: componentId, type: 'MultipleChoice', text: 'Multiple Choice' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className={`multipleChoice-container ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      <input
        type="text"
        className="multipleChoicetitle-container"
        placeholder="Multiple Choice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlurTitle}
      />
      <div className="multipleChoice-options">
        {options.map((option, index) => (
          <div key={index} className="multipleChoice-option">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => toggleSelection(option)}
              disabled={!option.trim()}
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />
            <button className="remove-option-btn" onClick={() => removeOption(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="add-option-btn" onClick={addOption}>
        Add Option
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);


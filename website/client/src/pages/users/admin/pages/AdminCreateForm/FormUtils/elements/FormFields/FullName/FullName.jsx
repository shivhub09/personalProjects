import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";
import "./FullName.css";
import { setFullNameData } from "../actions/fullNameActions";
import { v4 as uuidv4 } from "uuid";

const FullName = ({ fullNameDataList, setFullNameData }) => {
  const [componentId] = useState(uuidv4()); // Unique ID for this component instance

  const handleBlur = (event) => {
    const inputValue = event.target.value.trim();

    if (inputValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId // Match by this component's unique ID
      );

      if (existingEntry) {
        // Update the existing entry
        setFullNameData(existingEntry.uniqueId, inputValue, "Full Name");
      } else {
        // Create a new entry
        setFullNameData(componentId, inputValue, "FormList");
      }
    }
  };


  // just for testing purposes
  // const handleFocus = (event) => {
  //   const existingEntry = fullNameDataList.find(
  //     (entry) => entry.uniqueId === componentId // Match by this component's unique ID
  //   );

  //   if (existingEntry) {
  //     event.target.value = existingEntry.title; // Set the value of the input to the existing data
  //     console.log(`Existing Data for ${componentId}:`, existingEntry.title);
  //   } else {
  //     console.log(`No existing data found for component: ${componentId}`);
  //   }
  // };

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: componentId, type: "Full Name", text: "Full Name" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log("Full Name Data List:", fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="fullName-container" ref={dragRef}>
      <input
        type="text"
        className="fullName-title"
        placeholder="Full Name"
        onBlur={handleBlur} // Trigger save on losing focus
        // onFocus={handleFocus} // Populate the input field with existing data on focus
      />
      <div className="form-inputs">
        <div className="firstName">
          <input type="text" className="firstName-input" />
          <input
            type="text"
            className="firstName-title"
            placeholder="First Name"
          />
        </div>
        <div className="lastName">
          <input type="text" className="lastName-input" />
          <input
            type="text"
            className="lastName-title"
            placeholder="Last Name"
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullName);

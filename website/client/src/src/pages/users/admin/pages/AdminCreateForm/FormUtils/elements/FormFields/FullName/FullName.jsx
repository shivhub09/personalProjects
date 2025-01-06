// FullName.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";
import "./FullName.css";
import { setFullNameData } from "../actions/fullNameActions";
import { v4 as uuidv4 } from "uuid";

const FullName = ({ fullNameDataList, setFullNameData }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const id = uuidv4();
      setFullNameData(id, event.target.value, "Full Name");
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { id: uuidv4(), type: "Full Name", text: "Full Name" },
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
        name=""
        className="fullName-title"
        placeholder="Full Name"
        onKeyDown={handleKeyPress}
      />
      <div className="form-inputs">
        <div className="firstName">
          <input type="text" name="" className="firstName-input" id="" />
          <input
            type="text"
            name=""
            className="firstName-title"
            id=""
            placeholder="First Name"
          />
        </div>
        <div className="lastName">
          <input
            type="text"
            name=""
            className="lastName-input"
            id=""
            placeholder=""
          />
          <input
            type="text"
            name=""
            className="lastName-title"
            id=""
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

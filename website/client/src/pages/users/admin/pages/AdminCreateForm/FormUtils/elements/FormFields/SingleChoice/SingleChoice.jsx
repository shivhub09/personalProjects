import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';

const Phone = ({ fullNameDataList = [], setFullNameData }) => {
  const [componentId] = useState(uuidv4());

  const handleBlur = (field, value) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      const existingEntry = fullNameDataList.find(
        (entry) => entry.uniqueId === componentId
      );

      const newData = existingEntry
        ? { ...existingEntry.data, [field]: trimmedValue }
        : { [field]: trimmedValue };

      setFullNameData(componentId, newData, 'Phone');
    }
  };

  const handleRemove = () => {
    const updatedList = fullNameDataList.filter(
      (entry) => entry.uniqueId !== componentId
    );
    setFullNameData(null, updatedList, 'Phone'); // Pass the updated list
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Option"
        onBlur={(e) => handleBlur('option', e.target.value)}
      />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);

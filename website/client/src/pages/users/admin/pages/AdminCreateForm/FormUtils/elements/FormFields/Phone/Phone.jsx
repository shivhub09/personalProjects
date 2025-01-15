import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Phone.css';

const Phone = ({ fullNameDataList, setFullNameData }) => {
  const phoneId = useRef(uuidv4()); // Persistent ID for this component instance

  const handleBlur = (event) => {
    if (event.target.value.trim()) {
      setFullNameData(phoneId.current, event.target.value, 'Phone');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: phoneId.current, type: 'Phone', text: 'Phone' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="phoneNo-container" ref={dragRef}>
      <input
        type="text"
        className="phonenumberTitle"
        name="phoneNumberTitle"
        placeholder="Phone Number"
        onBlur={handleBlur}
      />
      <input type="number" name="" className="phoneNumberInput" id="" />
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

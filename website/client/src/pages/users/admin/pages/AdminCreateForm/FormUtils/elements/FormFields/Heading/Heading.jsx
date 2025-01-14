import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Heading.css';

const Heading = ({ fullNameDataList, setFullNameData }) => {
  const handleBlur = (event) => {
    if (event.target.value.trim()) {
      const id = uuidv4(); // Generate a unique ID
      setFullNameData(id, event.target.value, 'Heading',null);
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Heading', text: 'Heading' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
    <div className="heading-container" ref={dragRef}>
      <input
        type="text"
        className="input-heading"
        name="headingTitle"
        placeholder="Heading"
        onBlur={handleBlur} // Trigger save on losing focus
      />
      <input
        type="text"
        className="input-subHeading"
        placeholder="Sub Heading"
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

export default connect(mapStateToProps, mapDispatchToProps)(Heading);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Heading.css'
const Heading = ({ fullNameDataList, setFullNameData }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Heading');
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
      className='input-heading' 
      name="headingTitle" 
      placeholder='Heading' 
      onKeyDown={handleKeyPress}
      />
      <input type="text" className="input-subHeading" placeholder='Sub Heading' />
    </div>
  )
}

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};


export default connect(mapStateToProps, mapDispatchToProps)(Heading)
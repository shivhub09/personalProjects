import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Appointment.css'
const Appointment = ({ fullNameDataList, setFullNameData }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Appointment');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Appointment', text: 'Appointment' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);

  return (
      <div className="appointment-container" ref={dragRef}>
        <input type="text" name="appointmentTitle" 
      onKeyDown={handleKeyPress}className='appointment-title' id="" placeholder='Select an Appointment'/>

        <input type="datetime-local" name="" className='datetimeInput' id="" />
      </div>
  )
}

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};



export default connect(mapStateToProps, mapDispatchToProps)(Appointment) 

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import { setFullNameData } from '../actions/fullNameActions';
import { v4 as uuidv4 } from 'uuid';
import './Address.css'

const Address = ({ fullNameDataList, setFullNameData }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const id = uuidv4(); 
      setFullNameData(id, event.target.value, 'Address');
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id: uuidv4(), type: 'Address', text: 'Address' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name Data List:', fullNameDataList);
  }, [fullNameDataList]);


  return (
    <div className="address-container" ref={dragRef}>
      <div className="address-title-container">
        <input 
        type="text" 
        name="addressTitle"
        className="address-container-title" placeholder='Address'
        onKeyDown={handleKeyPress}
        />
      </div>

      <input type="text" className='street-address-input' name="" id="" />
      <h3>Street Address</h3>

      <input type="text" className='street-address-input-line2' name="" id="" />
      <h3>Street Address Line 2</h3>

      <div className="city-state">
        <div className="city-box">
          <input type="text" className='city-input' name="" id="" />
          <h3>City</h3>
        </div>

        <div className="state-box">
          <input type="text" className='state-input' name="" id="" />
          <h3>State/Province</h3>
        </div>
      </div>

      <input type="text" className='pincode-input' name="" id="" />
      <h3>Pincode/Zip Code</h3>
    </div>
  )
}

const mapStateToProps = (state) => ({
  fullNameDataList: state.fullName.fullNameDataList,
});

const mapDispatchToProps = {
  setFullNameData,
};


export default connect(mapStateToProps, mapDispatchToProps)(Address);


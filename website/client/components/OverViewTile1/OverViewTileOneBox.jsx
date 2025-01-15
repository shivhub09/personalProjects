import React from 'react';
import './OverViewTileOneBox.css';

const OverViewTileOneBox = (props) => {
  return (
    <div className="OverViewTileOneBox-container">
        <h1 className='containerone-title'>{props.title}</h1>
        <h1 className='container-number'>{props.number}</h1>
    </div>
  )
}

export default OverViewTileOneBox;

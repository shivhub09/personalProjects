import React from 'react';
import './SingleChoice.css';

const SingleChoice = () => {
  return (
    <div className="singleChoice-container">
      <p className="singleChoice-title">This is a single choice component</p>
      <div className="singleChoice-options">
        <label className="singleChoice-option">
          <input type="radio" name="singleChoice" value="option1" />
          Option 1
        </label>
        <label className="singleChoice-option">
          <input type="radio" name="singleChoice" value="option2" />
          Option 2
        </label>
        <label className="singleChoice-option">
          <input type="radio" name="singleChoice" value="option3" />
          Option 3
        </label>
        <label className="singleChoice-option">
          <input type="radio" name="singleChoice" value="option4" />
          Option 4
        </label>
      </div>
    </div>
  );
}

export default SingleChoice;

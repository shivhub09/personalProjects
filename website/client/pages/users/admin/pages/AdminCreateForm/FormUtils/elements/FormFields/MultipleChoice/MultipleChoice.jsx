import React from 'react';
import './MultipleChoice.css';

const MultipleChoice = () => {
  return (
    <div className="multipleChoice-container">
      <div className="multipleChoicetitle-container">
        <input type="text" placeholder="Multiple Choice Options" name="" id="" />
      </div>
      <div className="multipleChoice-options">
        <label className="multipleChoice-option">
          <input type="checkbox" name="multipleChoice" value="option1" />
          Option 1
        </label>
        <label className="multipleChoice-option">
          <input type="checkbox" name="multipleChoice" value="option2" />
          Option 2
        </label>
        <label className="multipleChoice-option">
          <input type="checkbox" name="multipleChoice" value="option3" />
          Option 3
        </label>
        <label className="multipleChoice-option">
          <input type="checkbox" name="multipleChoice" value="option4" />
          Option 4
        </label>
      </div>
    </div>
  );
}

export default MultipleChoice;

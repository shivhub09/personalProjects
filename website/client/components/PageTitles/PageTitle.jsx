import React from 'react';
import './PageTitle.css';

const PageTitle = (props) => {
  return (
    <div className="PageTitle">
    {props.title}
    </div>
  );
}

export default PageTitle;

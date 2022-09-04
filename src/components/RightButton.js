import React from 'react';

const RightButton = ({ clickHandler }) => (
  <div className='horizontal-button' id="right-button" onClick={clickHandler}>&gt;</div>
);

export default RightButton;
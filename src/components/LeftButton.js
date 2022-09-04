import React from 'react';

const LeftButton = ({ scrollX, clickHandler }) => {
  const btnIsVisible = scrollX > 50;
  const permClasses = 'horizontal-button left-button'
  const className = btnIsVisible ? `${permClasses} left-button-visible` : permClasses;
  // const style = { visibility: btnIsVisible ? 'visible' : 'hidden', opacity: btnIsVisible ? 1 : 0, transition: '0.5s' }

  return (
    <div
      className='horizontal-button'
      // className={className}
      id="left-button"
      // style={style}
      onClick={clickHandler}>
      &lt;
    </div>
  );
};

export default LeftButton;
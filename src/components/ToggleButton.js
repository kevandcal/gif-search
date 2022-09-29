import React, { useRef } from 'react';
import './ToggleButton.css';

export function ToggleButton({ label }) {
  const checkboxRef = useRef(null);

  const checkboxHandler = () => console.log(label + ' is checked? ' + checkboxRef.current.checked);

  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} ref={checkboxRef} onChange={checkboxHandler} />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};
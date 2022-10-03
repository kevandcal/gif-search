import React from 'react';

export function SettingsButton({ setFunction, text }) {

  const clickHandler = e => {
    e.preventDefault();
    setFunction(prev => !prev);
  };

  return (
    <button className="settings-btn" onClick={clickHandler}>{text}</button>
  )
}
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

export function SettingsButton({ setFunction, isActive, text }) {
  const toggleIcon = isActive ? faToggleOn : faToggleOff;

  const clickHandler = e => {
    e.preventDefault();
    setFunction(prev => !prev);
  };

  return (
    <div className="settings-btn" onClick={clickHandler}>
      <span className='settings-btn-text'>{text}</span>
      <FontAwesomeIcon icon={toggleIcon} className='toggle-switch-icon' />
    </div>
  );
}
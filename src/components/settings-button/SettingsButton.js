import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

export function SettingsButton({ setFunction, isActive, text, refreshOnClick }) {
  const toggleIcon = isActive ? faToggleOn : faToggleOff;

  const handleClick = e => {
    e.preventDefault();
    setFunction(prev => !prev);
    if (refreshOnClick) {
      window.location.reload();
    }
  };

  return (
    <div className="settings-btn" onClick={handleClick}>
      <span className='settings-btn-text'>{text}</span>
      <FontAwesomeIcon icon={toggleIcon} className='toggle-switch-icon' />
    </div>
  );
}
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import './SettingsButton.css';

interface SettingsButtonProps {
  setFunction: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
  text: string;
  refreshOnClick: boolean;
};

export function SettingsButton({ setFunction, isActive, text, refreshOnClick }: SettingsButtonProps) {
  const toggleIcon = isActive ? faToggleOn : faToggleOff;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFunction(prev => !prev);
    if (refreshOnClick) {
      window.location.reload();
    }
  };

  return (
    <button className="settings-btn" onClick={handleClick}>
      <span className='settings-btn-text'>{text}</span>
      <FontAwesomeIcon icon={toggleIcon} className='toggle-switch-icon' />
    </button>
  );
}
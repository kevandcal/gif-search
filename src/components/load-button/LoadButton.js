import React from 'react';
import { useSettings } from '../../context/settings-context';
import './LoadButton.css';

export function LoadButton({
  text,
  onClick,
  isDisplayed,
}) {
  const { darkModeIsActive } = useSettings();

  const loadBtnClassName = darkModeIsActive ? 'dark-mode' : '';

  return !isDisplayed ? null : (
    <div id='load-button-container' className={loadBtnClassName}>
      <button id='load-button' className={loadBtnClassName} onClick={onClick}>
        <span id='load-button-text'>{text}</span>
      </button>
    </div>
  );
}
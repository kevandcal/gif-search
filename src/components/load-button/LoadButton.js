import React from 'react';
import { useSettings } from '../../context/settings-context';

export function LoadButton({
  text,
  onClick,
  isDisplayed,
}) {
  const { darkModeIsActive } = useSettings();

  const loadBtnClassName = darkModeIsActive ? 'dark-mode' : '';

  return !isDisplayed ? null : (
    // <button id='load-button' className={loadBtnClassName} onClick={onClick}>
    //   <span id='load-button-text'>{text}</span>
    //   <span id='load-button-animation-span' className={loadBtnClassName} />
    // </button>
    <div id='load-button-container' className={loadBtnClassName} onClick={onClick}>
      <button id='load-button' className={loadBtnClassName}>
        <span id='load-button-text'>{text}</span>
      </button>
      {/* <span id='load-button-animation-span' className={loadBtnClassName} /> */}
    </div>
  );
}
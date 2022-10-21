import React from 'react'

export function LoadButton({
  text,
  onClick,
  isDisplayed,
  darkModeIsActive
}) {

  const loadBtnClassName = darkModeIsActive ? 'dark-mode' : '';

  return !isDisplayed ? null : (
    <button id='load-button' className={loadBtnClassName} onClick={onClick}>
      <span id='load-button-text'>{text}</span>
      <span id='load-button-animation-span' className={loadBtnClassName} />
    </button>
  );
}
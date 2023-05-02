import React, { MouseEventHandler } from 'react';
import { useSettings } from '../../hooks/useSettings';
import './LoadButton.css';

type Props = {
  text: string,
  onClick: MouseEventHandler,
  isDisplayed: boolean
};

export function LoadButton({ text, onClick, isDisplayed }: Props) {
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
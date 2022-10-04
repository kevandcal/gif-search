import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
// import { ToggleButton } from './ToggleButton';
import { SettingsButton } from './SettingsButton';

export function SettingsDialog({
  settingsDialogIsOpen,
  setSettingsDialogIsOpen,
  settingsIconRef,
  darkModeIsActive,
  setDarkModeIsActive,
  setIsLowResolution,
  setPlayOnlyOnHover,
}) {
  const { width } = useWindowSize();
  const dialogRef = useRef(null);
  const [dialogOffsetLeft, setDialogOffsetLeft] = useState(0);

  const settingsButtonData = [
    {
      setFunction: setIsLowResolution,
      text: 'Decrease resolution'
    },
    {
      setFunction: setPlayOnlyOnHover,
      text: 'Play only on hover'
    },
    {
      setFunction: setDarkModeIsActive,
      text: 'Dark mode'
    }
  ];

  // const dialogClassName = settingsDialogIsOpen ? 'open' : '';
  const dialogClassName = settingsDialogIsOpen && darkModeIsActive ? 'open dark-mode'
    : settingsDialogIsOpen ? 'open'
      : darkModeIsActive ? 'dark-mode'
        : '';

  // const clickInsideHandler = () => setSettingsDialogIsOpen(true);

  const handleClickOutside = e => {
    if (!dialogRef.current.contains(e.target) && !settingsIconRef.current.contains(e.target)) {
      setSettingsDialogIsOpen(false);
    }
  };

  const mousedownEffect = () => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  };

  const updateDialogOffsetLeft = () => {
    setDialogOffsetLeft(settingsIconRef.current?.offsetLeft);
  };

  useEffect(updateDialogOffsetLeft, [width]);
  useEffect(mousedownEffect, []);

  return (
    <div
      id="settings-dialog"
      ref={dialogRef}
      className={dialogClassName}
      style={{ left: dialogOffsetLeft }}
    // onClick={clickInsideHandler}
    >
      {settingsButtonData.map(obj => (
        <SettingsButton setFunction={obj.setFunction} text={obj.text} key={obj.text} />
      ))}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
// import { ToggleButton } from './ToggleButton';
import { SettingsButton } from './SettingsButton';

export function SettingsDialog({
  isHighResolution,
  setIsHighResolution,
  playOnlyOnHover,
  setPlayOnlyOnHover,
  darkModeIsActive,
  setDarkModeIsActive,
  settingsDialogIsOpen,
  settingsIconRef
}) {
  const { width } = useWindowSize();
  const [dialogOffsetLeft, setDialogOffsetLeft] = useState(0);

  const settingsButtonData = [
    {
      setFunction: setIsHighResolution,
      text: `${isHighResolution ? 'Decrease' : 'Increase'} resolution`
    },
    {
      setFunction: setPlayOnlyOnHover,
      text: `Hover to play ${playOnlyOnHover ? 'on' : 'off'}`
    },
    {
      setFunction: setDarkModeIsActive,
      text: `Dark mode ${darkModeIsActive ? 'off' : 'on'}`
    }
  ];

  const dialogClassName = settingsDialogIsOpen ? 'open' : '';

  const updateDialogOffsetLeft = () => {
    setDialogOffsetLeft(settingsIconRef.current?.offsetLeft);
  };

  useEffect(updateDialogOffsetLeft, [width]);

  return (
    <div
      id="settings-dialog"
      className={dialogClassName}
      style={{ left: dialogOffsetLeft }}
    >
      {settingsButtonData.map(obj => (
        <SettingsButton setFunction={obj.setFunction} text={obj.text} key={obj.text} />
      ))}
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SettingsButton } from '../settings-button/SettingsButton';

export function SettingsDialog({
  isOpen,
  setIsOpen,
  settingsIconRef,
  darkModeIsActive,
  setDarkModeIsActive,
  isLowResolution,
  setIsLowResolution,
  playOnlyOnHover,
  setPlayOnlyOnHover,
  lazyLoadingIsOn,
  setLazyLoadingIsOn,
  infiniteScrollIsActive,
  setInfiniteScrollIsActive
}) {
  const { width } = useWindowSize();
  const dialogRef = useRef(null);
  const [dialogOffsetLeft, setDialogOffsetLeft] = useState(0);

  const settingsButtonData = [
    {
      setFunction: setLazyLoadingIsOn,
      state: lazyLoadingIsOn,
      text: 'Lazy loading',
    },
    {
      setFunction: setIsLowResolution,
      state: isLowResolution,
      text: 'Low resolution'
    },
    {
      setFunction: setPlayOnlyOnHover,
      state: playOnlyOnHover,
      text: 'Play only on hover'
    },
    {
      setFunction: setInfiniteScrollIsActive,
      state: infiniteScrollIsActive,
      text: 'Infinte scroll'
    },
    {
      setFunction: setDarkModeIsActive,
      state: darkModeIsActive,
      text: 'Dark mode'
    }
  ];

  const dialogClassName = `${isOpen ? 'open ' : ''}${darkModeIsActive ? 'dark-mode' : ''}`;

  const handleClickOutside = e => {
    if (!dialogRef.current.contains(e.target) && !settingsIconRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const mousedownEffect = () => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  };

  const updateDialogOffsetLeft = () => {
    const offsetLeft = settingsIconRef.current?.offsetLeft;
    const dialogWidth = 220;
    const iconWidth = 16;
    const result = offsetLeft - dialogWidth + (iconWidth / 2);
    setDialogOffsetLeft(result);
  };

  useEffect(updateDialogOffsetLeft, [width]);
  useEffect(mousedownEffect, []);

  return (
    <div
      id="settings-dialog"
      ref={dialogRef}
      className={dialogClassName}
      style={{ left: dialogOffsetLeft }}
    >
      {settingsButtonData.map(obj => (
        <SettingsButton setFunction={obj.setFunction} isActive={obj.state} text={obj.text} key={obj.text} />
      ))}
    </div>
  );
}
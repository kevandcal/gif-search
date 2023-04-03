import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SettingsButton } from '../settings-button/SettingsButton';
import { useSettings } from '../../context/settings-context';

export function SettingsDialog({
  isOpen,
  setIsOpen,
  settingsIconRef,
  infiniteScrollIsActive,
  setInfiniteScrollIsActive,
}) {
  const {
    isLowResolution,
    setIsLowResolution,
    playOnlyOnHover,
    setPlayOnlyOnHover,
    lazyLoadingIsOn,
    setLazyLoadingIsOn,
    darkModeIsActive,
    setDarkModeIsActive
  } = useSettings();
  const { width } = useWindowSize();
  const dialogRef = useRef(null);
  const [dialogOffsetLeft, setDialogOffsetLeft] = useState(0);

  const settingsButtonData = [
    {
      setFunction: setLazyLoadingIsOn,
      state: lazyLoadingIsOn,
      text: 'Lazy loading',
      refresh: false
    },
    {
      setFunction: setIsLowResolution,
      state: isLowResolution,
      text: 'Low resolution',
      refresh: false
    },
    {
      setFunction: setPlayOnlyOnHover,
      state: playOnlyOnHover,
      text: 'Play only on hover',
      refresh: false
    },
    {
      setFunction: setInfiniteScrollIsActive,
      state: infiniteScrollIsActive,
      text: 'Infinte scroll',
      refresh: true
    },
    {
      setFunction: setDarkModeIsActive,
      state: darkModeIsActive,
      text: 'Dark mode',
      refresh: false
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
      {settingsButtonData.map(setting => (
        <SettingsButton
          key={setting.text}
          setFunction={setting.setFunction}
          isActive={setting.state}
          text={setting.text}
          refreshOnClick={setting.refresh}
        />
      ))}
    </div>
  );
}
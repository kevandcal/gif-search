import React, { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSettings } from '../../hooks/useSettings';
import { SettingsButton } from '../settings-button/SettingsButton';
import './SettingsDialog.css';

type SetStateToBoolean = Dispatch<SetStateAction<boolean>>;

interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: SetStateToBoolean;
  settingsIconRef: RefObject<HTMLButtonElement>;
  infiniteScrollIsActive: boolean;
  setInfiniteScrollIsActive: SetStateToBoolean;
};

export function SettingsDialog({
  isOpen,
  setIsOpen,
  settingsIconRef,
  infiniteScrollIsActive,
  setInfiniteScrollIsActive,
}: SettingsDialogProps) {
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
  const dialogRef = useRef<HTMLDivElement>(null);
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

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !dialogRef.current?.contains(e.target) &&
      !settingsIconRef.current?.contains(e.target)
    ) {
      setIsOpen(false);
    }
  }, [setIsOpen, dialogRef, settingsIconRef]);

  const mousedownEffect = () => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  };

  const updateDialogOffsetLeft = () => {
    const offsetLeft = settingsIconRef.current?.offsetLeft;
    if (typeof offsetLeft === 'undefined') {
      return;
    }
    const dialogWidth = 222;
    const iconWidth = 50;
    const result = offsetLeft - dialogWidth + (iconWidth / 2);
    setDialogOffsetLeft(result);
  };

  useEffect(updateDialogOffsetLeft, [width, settingsIconRef]);
  useEffect(mousedownEffect, [handleClickOutside]);

  return (
    <div
      id="settings-dialog"
      ref={dialogRef}
      className={dialogClassName}
      style={{ left: dialogOffsetLeft }}
    >
      {settingsButtonData.map(({ text, setFunction, state, refresh }) => (
        <SettingsButton
          key={text}
          setFunction={setFunction}
          isActive={state}
          text={text}
          refreshOnClick={refresh}
        />
      ))}
    </div>
  );
}
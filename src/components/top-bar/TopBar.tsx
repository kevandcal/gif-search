import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons'
import { SettingsDialog } from '../settings-dialog/SettingsDialog';
import { SearchBar } from '../search-bar/SearchBar';
import { useSettings } from '../../hooks/useSettings';
import { GifsInterface } from '../app/App';
import './TopBar.css';

interface TopBarProps {
  trendingGifsQueryCode: string;
  queryRef: { current: string };
  setGifs: Dispatch<SetStateAction<GifsInterface[]>>;
  setFailedToLoad: Dispatch<SetStateAction<boolean>>;
  fetchGifs: (query?: string | undefined, offset?: number | undefined) => Promise<void>;
  topBarIsStyled: boolean;
  infiniteScrollIsActive: boolean;
  setInfiniteScrollIsActive: Dispatch<SetStateAction<boolean>>;
};

export function TopBar({
  trendingGifsQueryCode,
  queryRef,
  setGifs,
  setFailedToLoad,
  fetchGifs,
  topBarIsStyled,
  infiniteScrollIsActive,
  setInfiniteScrollIsActive
}: TopBarProps) {
  const { darkModeIsActive } = useSettings();
  const settingsIconRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const topBarClassName = `${darkModeIsActive ? 'dark ' : ''}${topBarIsStyled ? 'styled' : ''}`;

  const submitQuery = (query: string) => {
    setGifs([]);
    setFailedToLoad(false);
    inputRef.current?.blur();
    fetchGifs(query, 0);
    queryRef.current = query;
  };

  const handleHomeIconClick = (event: SyntheticEvent) => {
    event.preventDefault();
    submitQuery(trendingGifsQueryCode);
    setTitle('');
  }

  const handleSettingsIconClick = (event: SyntheticEvent) => {
    event.preventDefault();
    setSettingsDialogIsOpen(prev => !prev);
  };

  const handleDarkMode = () => {
    document.body.classList.toggle('dark', darkModeIsActive);
  };

  useEffect(handleDarkMode, [darkModeIsActive]);

  return (
    <div
      id='top-bar'
      className={topBarClassName}
    >
      <div id='top-bar-content'>
        <button aria-label='Home' onClick={handleHomeIconClick} className='top-bar-icon-button'>
          <FontAwesomeIcon icon={faHome} className='top-bar-icon' />
        </button>
        <SearchBar
          inputRef={inputRef}
          submitQuery={submitQuery}
          darkModeIsActive={darkModeIsActive}
          title={title}
          setTitle={setTitle}
        />
        <button
          aria-label='Settings'
          className='top-bar-icon-button'
          ref={settingsIconRef}
          onClick={handleSettingsIconClick}
        >
          <FontAwesomeIcon icon={faEllipsisV} className='top-bar-icon' />
        </button>
      </div>
      <SettingsDialog
        isOpen={settingsDialogIsOpen}
        setIsOpen={setSettingsDialogIsOpen}
        settingsIconRef={settingsIconRef}
        infiniteScrollIsActive={infiniteScrollIsActive}
        setInfiniteScrollIsActive={setInfiniteScrollIsActive}
      />
    </div>
  );
}

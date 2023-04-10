import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons'
import { SettingsDialog } from '../settings-dialog/SettingsDialog';
import { SearchBar } from '../search-bar/SearchBar';
import { useSettings } from '../../context/settings-context';
import './TopBar.css';

export function TopBar({
  trendingGifsQueryCode,
  queryString,
  setQueryString,
  setGifs,
  setFailedToLoad,
  fetchGifs,
  topBarIsStyled,
  infiniteScrollIsActive,
  setInfiniteScrollIsActive
}) {
  const { darkModeIsActive } = useSettings();
  const settingsIconRef = useRef(null);
  const inputRef = useRef(null);
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState(false);

  const topBarClassName = `${darkModeIsActive ? 'dark ' : ''}${topBarIsStyled ? 'styled' : ''}`;

  const submitQuery = query => {
    setGifs([]);
    setFailedToLoad(false);
    inputRef.current.blur();
    fetchGifs(query, 0);
  };

  const handleHomeIconClick = event => {
    event.preventDefault();
    submitQuery(trendingGifsQueryCode);
    setQueryString(trendingGifsQueryCode);
  }

  const handleSettingsIconClick = event => {
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
        <button onClick={handleHomeIconClick} className='top-bar-icon-button'>
          <FontAwesomeIcon icon={faHome} className='top-bar-icon' />
        </button>
        <SearchBar
          inputRef={inputRef}
          submitQuery={submitQuery}
          darkModeIsActive={darkModeIsActive}
          trendingGifsQueryCode={trendingGifsQueryCode}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <button
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

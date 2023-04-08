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

  const handleSettingsIconClick = () => setSettingsDialogIsOpen(prev => !prev);

  const submitQuery = query => {
    setGifs([]);
    setFailedToLoad(false);
    inputRef.current.blur();
    fetchGifs(query, 0);
  };

  const handleHomeIconClick = () => {
    submitQuery(trendingGifsQueryCode);
    setQueryString(trendingGifsQueryCode);
  }

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
        <div onClick={handleHomeIconClick} className='top-bar-icon-container'>
          <FontAwesomeIcon icon={faHome} className='top-bar-icon' />
        </div>
        <SearchBar
          inputRef={inputRef}
          submitQuery={submitQuery}
          darkModeIsActive={darkModeIsActive}
          trendingGifsQueryCode={trendingGifsQueryCode}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <div
          className='top-bar-icon-container'
          ref={settingsIconRef}
          onClick={handleSettingsIconClick}
        >
          <FontAwesomeIcon icon={faEllipsisV} className='top-bar-icon' />
        </div>
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

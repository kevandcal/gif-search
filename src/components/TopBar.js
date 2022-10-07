import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons'
import { SettingsDialog } from './SettingsDialog';
import { SearchBar } from './SearchBar';

export function TopBar({
  trendingGifsQueryCode,
  gifsContainerRef,
  queryString,
  setQueryString,
  setGifs,
  setApiResOffset,
  setFailedToLoad,
  topBarIsStyled,
  setTopBarIsStyled,
  isLowResolution,
  setIsLowResolution,
  playOnlyOnHover,
  setPlayOnlyOnHover,
  lazyLoadingIsOn,
  setLazyLoadingIsOn
}) {
  const settingsIconRef = useRef(null);
  const inputRef = useRef(null);
  const [typedString, setTypedString] = useState("");
  const [darkModeIsActive, setDarkModeIsActive] = useState(false);
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState(false);

  const topBarClassName = darkModeIsActive && topBarIsStyled ? 'dark styled'
    : darkModeIsActive ? 'dark'
      : topBarIsStyled ? 'styled'
        : '';

  const settingsIconClickHandler = () => setSettingsDialogIsOpen(prev => !prev);

  const submitQuery = query => {
    if (!query) {
      window.alert('Please enter a search term');
    } else if (query !== queryString) {
      setTopBarIsStyled(false);
      setApiResOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(query);
      inputRef.current.blur();
      gifsContainerRef.current.scroll({ top: 0 });
    }
  }

  const homeIconClickHandler = () => {
    setTypedString('');
    submitQuery(trendingGifsQueryCode);
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
        <div onClick={homeIconClickHandler} className='top-bar-icon-container'>
          <FontAwesomeIcon icon={faHome} className='top-bar-icon' />
        </div>
        <SearchBar
          inputRef={inputRef}
          submitQuery={submitQuery}
          darkModeIsActive={darkModeIsActive}
          typedString={typedString}
          setTypedString={setTypedString}
        />
        <div
          className='top-bar-icon-container'
          ref={settingsIconRef}
          onClick={settingsIconClickHandler}
        >
          <FontAwesomeIcon icon={faEllipsisV} className='top-bar-icon' />
        </div>
      </div>
      <SettingsDialog
        settingsDialogIsOpen={settingsDialogIsOpen}
        setSettingsDialogIsOpen={setSettingsDialogIsOpen}
        settingsIconRef={settingsIconRef}
        darkModeIsActive={darkModeIsActive}
        setDarkModeIsActive={setDarkModeIsActive}
        isLowResolution={isLowResolution}
        setIsLowResolution={setIsLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        setPlayOnlyOnHover={setPlayOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
        setLazyLoadingIsOn={setLazyLoadingIsOn}
      />
    </div>
  );
}

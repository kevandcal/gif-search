import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import './ToggleButton';
// import { ToggleButton } from './ToggleButton';
// import { SettingsButton } from './SettingsButton';
import { SettingsDialog } from './SettingsDialog';

export function TopBar({ queryString, gifsContainerRef, setQueryString, setGifs, setApiResOffset, setFailedToLoad, topBarIsStyled, setTopBarIsStyled, setIsLowResolution, setPlayOnlyOnHover }) {
  const settingsIconRef = useRef(null);
  const inputRef = useRef(null);
  const [typedString, setTypedString] = useState("");
  const [darkModeIsActive, setDarkModeIsActive] = useState(false);
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState(false);

  const topBarClassName = darkModeIsActive && topBarIsStyled ? 'dark styled'
    : darkModeIsActive ? 'dark'
      : topBarIsStyled ? 'styled'
        : '';
  // let topBarClassName = '';
  // if (darkModeIsActive && topBarIsStyled) {
  //   topBarClassName = 'dark styled';
  // } else if (darkModeIsActive) {
  //   topBarClassName = 'dark';
  // } else if (topBarIsStyled) {
  //   topBarClassName = 'styled';
  // }

  // const settingsIconClassName = darkModeIsActive ? 'dark-mode' : '';
  const settingsIconClassName = darkModeIsActive && settingsDialogIsOpen ? 'dark-mode open'
    : darkModeIsActive ? 'dark-mode'
      : settingsDialogIsOpen ? 'open'
        : '';

  const inputClassName = darkModeIsActive ? 'dark-mode' : '';

  const settingsIconClickHandler = () => setSettingsDialogIsOpen(prev => !prev);

  const handleInputChange = e => setTypedString(e.target.value);

  const handleDarkMode = () => {
    document.body.classList.toggle('dark', darkModeIsActive);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (typedString && typedString !== queryString) {
      setTopBarIsStyled(false);
      setApiResOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(typedString);
      inputRef.current.blur();
      gifsContainerRef.current.scroll({ top: 0 });
      // setTypedString("");
    }
  };

  useEffect(handleDarkMode, [darkModeIsActive]);

  return (
    <div
      id='top-bar'
      className={topBarClassName}
    >
      <div id='top-bar-content'>
        <div
          id='settings-icon-container'
          className={settingsIconClassName}
          ref={settingsIconRef}
          onClick={settingsIconClickHandler}
        >
          <FontAwesomeIcon icon={faGear} className='settings-icon' />
        </div>
        <div id='input-form-container'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={inputRef}
              className={inputClassName}
              placeholder="What type of GIFs would you like to see?"
              value={typedString}
              onChange={handleInputChange}
            />
            <button id='submit-btn'>Search</button>
          </form>
        </div>
        {/* <ToggleButton label='yo' />
      <ToggleButton label='asdfasd' /> */}
        {/* <FontAwesomeIcon icon={faChevronDown} /> */}
        {/* {settingsButtonData.map(obj => (
        <SettingsButton setFunction={obj.setFunction} text={obj.text} key={obj.text} />
      ))} */}
        {/* <p>{queryString}</p> */}
      </div>
      <SettingsDialog
        settingsDialogIsOpen={settingsDialogIsOpen}
        setSettingsDialogIsOpen={setSettingsDialogIsOpen}
        settingsIconRef={settingsIconRef}
        darkModeIsActive={darkModeIsActive}
        setDarkModeIsActive={setDarkModeIsActive}
        setIsLowResolution={setIsLowResolution}
        setPlayOnlyOnHover={setPlayOnlyOnHover}
      />
    </div>
  );
}

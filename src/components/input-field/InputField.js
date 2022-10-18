import React, { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export function InputField({ inputRef, darkModeIsActive, typedString, setTypedString }) {
  const { width } = useWindowSize();
  const [focusInInput, setFocusInInput] = useState(false);

  const inputClassName = darkModeIsActive && focusInInput ? 'dark-mode input-focus'
    : darkModeIsActive ? 'dark-mode'
      : focusInInput ? 'input-focus'
        : '';

  const placeholder = `What type of GIFS${width > 550 ? ' would you like to see' : ''}?`;

  const inputChangeHandler = e => setTypedString(e.target.value);

  const xIconClickHandler = () => {
    setTypedString('');
    inputRef.current.focus();
  };

  const inputFocusHandler = () => setFocusInInput(true);
  const inputBlurHanlder = () => setFocusInInput(false);

  const xIcon = !typedString ? null : (
    <div id="x-icon-container" onClick={xIconClickHandler}>
      <FontAwesomeIcon icon={faXmark} id='x-icon' />
    </div>
  );

  return (
    <div id="input-container" className={inputClassName}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={typedString}
        onChange={inputChangeHandler}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHanlder}
      />
      {xIcon}
    </div >
  );
}


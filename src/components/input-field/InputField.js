import React, { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export function InputField({
  inputRef,
  darkModeIsActive,
  trendingGifsQueryCode,
  queryString,
  setQueryString
}) {
  const { width } = useWindowSize();
  const [focusInInput, setFocusInInput] = useState(false);

  const inputValue = queryString === trendingGifsQueryCode ? '' : queryString;

  const inputClassName = `${darkModeIsActive ? 'dark-mode ' : ''}${focusInInput ? 'input-focus' : ''}`;

  const placeholder = `What type of GIFs${width > 550 ? ' would you like to see' : ''}?`;

  const handleInputChange = e => setQueryString(e.target.value);
  const handleInputFocus = () => setFocusInInput(true);
  const handleInputBlur = () => setFocusInInput(false);

  const handleXIconClick = () => {
    setQueryString('');
    inputRef.current.focus();
  };

  const xIcon = !inputValue ? null : (
    <div id="x-icon-container" onClick={handleXIconClick}>
      <FontAwesomeIcon icon={faXmark} id='x-icon' />
    </div>
  );

  return (
    <div id="input-container" className={inputClassName}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {xIcon}
    </div >
  );
}


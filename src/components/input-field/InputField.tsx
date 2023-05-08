import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSettings } from '../../hooks/useSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { InputFieldProps } from '../search-bar/SearchBar';
import './InputField.css';

export function InputField({
  inputRef,
  title,
  setTitle
}: InputFieldProps) {
  const { width } = useWindowSize();
  const { darkModeIsActive } = useSettings();
  const [focusOnInput, setFocusOnInput] = useState(false);

  const inputClassName = `${darkModeIsActive ? 'dark-mode ' : ''}${focusOnInput ? 'input-focus' : ''}`;

  const placeholder = `What type of GIFs${width && width > 550 ? ' would you like to see' : ''}?`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleInputFocus = () => setFocusOnInput(true);
  const handleInputBlur = () => setFocusOnInput(false);

  const handleXIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <div id="input-container" className={inputClassName}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={title}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {title &&
        <button id="x-icon-button" aria-label='X' type='button' onClick={handleXIconClick}>
          <FontAwesomeIcon icon={faXmark} id='x-icon' />
        </button>
      }
    </div >
  );
}


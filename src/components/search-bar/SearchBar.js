import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputField } from '../input-field/InputField';
import './SearchBar.css';

export function SearchBar({
  inputRef,
  submitQuery,
  darkModeIsActive,
  title,
  setTitle
}) {

  const submitBtnClassName = !title ? 'disabled' : '';

  const handleSubmit = e => {
    e.preventDefault();
    if (title) {
      submitQuery(title);
    }
  };

  return (
    <>
      <form id='form' onSubmit={handleSubmit}>
        <InputField
          inputRef={inputRef}
          darkModeIsActive={darkModeIsActive}
          title={title}
          setTitle={setTitle}
        />
        <button
          id='submit-btn'
          type='submit'
          aria-label='Search'
          form='form'
          className={submitBtnClassName}
          disabled={!title}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass-icon" />
        </button>
      </form>
    </>
  );
}


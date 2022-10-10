import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputField } from './InputField';

export function SearchBar({
  inputRef,
  submitQuery,
  darkModeIsActive,
  typedString,
  setTypedString
}) {

  const submitHandler = e => {
    e.preventDefault();
    submitQuery(typedString);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <InputField
          inputRef={inputRef}
          darkModeIsActive={darkModeIsActive}
          typedString={typedString}
          setTypedString={setTypedString}
        />
        <button id='submit-btn'>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass-icon" />
        </button>
      </form>
    </>
  );
}


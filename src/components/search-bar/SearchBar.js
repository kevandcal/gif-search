import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputField } from '../input-field/InputField';

export function SearchBar({
  inputRef,
  submitQuery,
  darkModeIsActive,
  typedString,
  setTypedString
}) {

  const handleSubmit = e => {
    e.preventDefault();
    submitQuery(typedString);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          inputRef={inputRef}
          darkModeIsActive={darkModeIsActive}
          typedString={typedString}
          setTypedString={setTypedString}
        />
        <button id='submit-btn' aria-label='Search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass-icon" />
        </button>
      </form>
    </>
  );
}


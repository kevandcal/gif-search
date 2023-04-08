import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputField } from '../input-field/InputField';
import './SearchBar.css';

export function SearchBar({
  inputRef,
  submitQuery,
  darkModeIsActive,
  trendingGifsQueryCode,
  queryString,
  setQueryString
}) {

  const handleSubmit = e => {
    e.preventDefault();
    if (!queryString || queryString === trendingGifsQueryCode) {
      window.alert('Please enter a search term');
    } else {
      submitQuery(queryString);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          inputRef={inputRef}
          darkModeIsActive={darkModeIsActive}
          trendingGifsQueryCode={trendingGifsQueryCode}
          queryString={queryString}
          setQueryString={setQueryString}
        />
        <button id='submit-btn' aria-label='Search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass-icon" />
        </button>
      </form>
    </>
  );
}


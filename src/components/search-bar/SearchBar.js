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

  const submissionCriteriaMet = queryString && (queryString !== trendingGifsQueryCode);
  const submitBtnClassName = submissionCriteriaMet ? '' : 'deactivated';

  const handleSubmit = e => {
    e.preventDefault();
    if (submissionCriteriaMet) {
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
        <button id='submit-btn' aria-label='Search' className={submitBtnClassName}>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifying-glass-icon" />
        </button>
      </form>
    </>
  );
}


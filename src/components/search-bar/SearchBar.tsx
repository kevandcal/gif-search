import React, { Dispatch, FormEvent, RefObject, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { InputField } from '../input-field/InputField';
import './SearchBar.css';

export interface InputFieldProps {
  inputRef: RefObject<HTMLInputElement>;
  darkModeIsActive: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

interface SearchBarProps extends InputFieldProps {
  submitQuery: (query: string) => void;
}

export function SearchBar({
  inputRef,
  submitQuery,
  darkModeIsActive,
  title,
  setTitle
}: SearchBarProps) {

  const submitBtnClassName = !title ? 'disabled' : '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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


import React, { useState, useEffect } from 'react';
import RowOfGifs from './RowOfGifs';
import { API_KEY } from '../secrets.json';

export default function UserSearchGifs() {
  const [typedString, setTypedString] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [searchResultGifs, setSearchResultGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [offset, setOffset] = useState(0);

  const submitHandler = e => {
    e.preventDefault();
    if (typedString !== gifSearch) {
      setOffset(0);
      setSearchResultGifs([]);
      setFailedToLoad(false);
      setGifSearch(typedString);
      setTypedString("");
    }
  };

  const inputChangeHandler = e => setTypedString(e.target.value);

  const runApiSearch = () => {
    const limit = 15;
    // This condition prevents this API request being made on the intitial mount:
    if (gifSearch !== "") {
      setIsLoading(true);
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${gifSearch}&limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(jsonRes => {
          // Check in meta data whether response is OK:
          if (jsonRes.meta.status < 200 || jsonRes.meta.status > 299) {
            throw new Error(jsonRes.meta.msg);
          } else if (jsonRes.data.length === 0) {
            throw new Error('No valid results');
          } else {
            setOffset(offset + limit);
            setSearchResultGifs(searchResultGifs.concat(jsonRes.data))
          }
        })
        .catch(err => {
          setIsLoading(false);
          setFailedToLoad(true);
          console.log("Error:", err)
        })
    }
  };

  const handleLoading = () => {
    if (isLoading && searchResultGifs.length > 0) {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(runApiSearch, [gifSearch]);
  useEffect(handleLoading, [isLoading, searchResultGifs.length]);

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="What type of GIFs would you like to see?"
          value={typedString}
          onChange={inputChangeHandler}
        />
        <button>Search</button>
      </form>
      <ResultsRow
        gifSearch={gifSearch}
        searchResultGifs={searchResultGifs}
        runApiSearch={runApiSearch}
        failedToLoad={failedToLoad}
        isLoading={isLoading}
        offset={offset}
      />
    </React.Fragment>
  );
}

function ResultsRow({ gifSearch, searchResultGifs, runApiSearch, failedToLoad, isLoading, offset }) {
  let thingToShow = null;
  if (searchResultGifs.length > 0) {
    thingToShow = (
      <>
        {/* Search query becomes heading, formatted with capital first letter: */}
        <h2>{gifSearch.charAt(0).toUpperCase() + gifSearch.substring(1).toLowerCase()} GIFs</h2>
        <RowOfGifs gifs={searchResultGifs} runApiSearch={runApiSearch} />
      </>
    );
  } else if (failedToLoad) {
    thingToShow = (
      // If search fails, remove spinner and inform user:
      <p id="error-message">Oops, something went wrong with your search. Check console for error message, or simply try again.</p>
    );
  } else if (isLoading && offset === 0) {
    thingToShow = (
      // While search results are loading, render spinner:
      <img id="spinner" alt="Search results are loading" src="./spinner.gif" />
    );
  }

  return thingToShow;
}
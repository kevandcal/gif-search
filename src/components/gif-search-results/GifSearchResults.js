import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GifsGrid } from '../gifs-grid/GifsGrid';

export const GifSearchResults = React.memo(({
  gifs,
  gifsContainerRef,
  isLoading,
  failedToLoad
}) => {
  const displaySpinner = isLoading && !gifs.length;

  if (displaySpinner) {
    // while initial search results are loading, render spinner:
    return (
      <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />
    );
  } else if (failedToLoad) {
    // if search fails, remove spinner and inform user:
    return (
      <p id="error-message">
        Oops, something went wrong with your search. Click <a href='/'>here</a> to refresh.
      </p>
    );
  } else {
    return (
      <GifsGrid
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
      />
    );
  }
});

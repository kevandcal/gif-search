import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GifsGrid } from '../gifs-grid/GifsGrid';

export const GifSearchResults = React.memo(({
  gifs,
  gifsContainerRef,
  isLoading,
  apiResOffset,
  failedToLoad,
  isLowResolution,
  playOnlyOnHover,
  lazyLoadingIsOn
}) => {

  const displaySpinner = isLoading && apiResOffset === 0;
  // should the second condition be apiResOffset % pageThreshold === 0 or !gifs.length instead of apiResOffset === 0?

  if (displaySpinner) {
    // while search results are loading, render spinner:
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
        isLowResolution={isLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
      />
    );
  }
});


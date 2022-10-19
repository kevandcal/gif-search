import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GifsGrid } from '../gifs-grid/GifsGrid';

export const GifResults = React.memo(({
  gifs,
  gifsContainerRef,
  failedToLoad,
  displaySpinner,
  isLowResolution,
  playOnlyOnHover,
  lazyLoadingIsOn
}) => {

  useEffect(() => console.log('GifResults rerendered'));

  let content = null;
  if (displaySpinner) {
    // while search results are loading, render spinner:
    content = (
      <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />
    );
  } else if (failedToLoad) {
    // if search fails, remove spinner and inform user:
    content = (
      <p id="error-message">
        Oops, something went wrong with your search. Click <a href='/'>here</a> to refresh.
      </p>
    );
  } else {
    content = (
      <GifsGrid
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
        isLowResolution={isLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
      />
    );
  }

  return content;
});



import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Gif } from './Gif';

export function GifResults({
  gifs,
  gifsContainerRef,
  failedToLoad,
  displaySpinner,
  isLowResolution,
  playOnlyOnHover,
  lazyLoadingIsOn
}) {
  const { width } = useWindowSize();
  const [gifGridWidth, setGifGridWidth] = useState(0);

  const gifGridStyle = { width: !gifGridWidth ? 0 : gifGridWidth };

  const calculateGridWidth = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    // for narrow (phone) screens, reduce gif width to 90vw:
    const gifWidth = availableWidth < 395 ? availableWidth : 395;
    const columnsThatFit = Math.floor((availableWidth + columnGap) / (gifWidth + columnGap));
    const columnAmount = columnsThatFit > 3 ? 3 : columnsThatFit;
    const gridWidth = (columnAmount * gifWidth) + ((columnAmount - 1) * columnGap);
    setGifGridWidth(gridWidth);
  };

  useEffect(calculateGridWidth, [width]);

  let content = null;
  if (displaySpinner) {
    content = (
      // while search results are loading, render spinner:
      <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />
    );
  } else if (failedToLoad) {
    content = (
      // if search fails, remove spinner and inform user:
      <p id="error-message">
        Oops, something went wrong with your search. Click <a href='/'>here</a> to refresh.
      </p>
    );
  } else {
    content = (
      <div
        className="gifs-grid"
        style={gifGridStyle}
      >
        {gifs.map((gif, index) => (
          <Gif key={index} gifObject={gif} gifsContainerRef={gifsContainerRef} isLowResolution={isLowResolution} playOnlyOnHover={playOnlyOnHover} lazyLoadingIsOn={lazyLoadingIsOn} />
        ))}
      </div>
    );
  }

  return content;
}


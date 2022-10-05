import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Gif } from './Gif';

export function GifContent({ fetchData, gifs, gifsContainerRef, failedToLoad, displaySpinner, setTopBarIsStyled, isLowResolution, playOnlyOnHover }) {
  const { width, height } = useWindowSize();
  const [gifGridWidth, setGifGridWidth] = useState(0);

  const gifGridStyle = { width: !gifGridWidth ? 0 : gifGridWidth };

  const refreshPage = () => window.location.reload();

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

  const handleScroll = () => {
    const refEl = gifsContainerRef.current;
    // infinite scroll:
    if (Math.ceil(refEl?.scrollTop + refEl?.clientHeight) >= refEl?.scrollHeight) {
      fetchData();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(refEl.scrollTop >= height * 0.05);
  };

  useEffect(calculateGridWidth, [width]);

  let content = null;
  if (failedToLoad) {
    content = (
      // if search fails, remove spinner and inform user:
      <p id="error-message">
        Oops, something went wrong with your search. Click <u onClick={refreshPage}>here</u> to refresh.
      </p>
    );
  } else if (displaySpinner) {
    content = (
      // while search results are loading, render spinner:
      <div id="spinner-container">
        <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />
      </div>
    );
  } else {
    content = (
      <>
        <div className='gifs-container' ref={gifsContainerRef} onScroll={handleScroll}>
          <div
            className="gifs-grid"
            style={gifGridStyle}
          >
            {gifs.map((gif, index) => (
              <Gif key={index} gifObject={gif} isLowResolution={isLowResolution} playOnlyOnHover={playOnlyOnHover} />
            ))}
          </div>
        </div >
      </>
    );
  }

  return content;
}


import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import spinner from '../images/spinner.gif'
import { Gif } from './Gif';

export function GifContent({ fetchData, gifs, failedToLoad, displaySpinner, setTopBarIsStyled, isHighResolution, playOnlyOnHover }) {
  const gifsContainerRef = useRef(null);
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
    if (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight) {
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
      <img id="spinner" alt="Search results are loading" src={spinner} />
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
              <Gif key={index} gifObject={gif} isHighResolution={isHighResolution} playOnlyOnHover={playOnlyOnHover} />
            ))}
          </div>
        </div >
      </>
    );
  }

  return content;
}


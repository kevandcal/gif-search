import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import spinner from '../images/spinner.gif'
import { Gif } from './gif';

export function GifContent({ fetchData, gifs, failedToLoad, displaySpinner }) {
  const gifsContainerRef = useRef(null);
  const { width } = useWindowSize();
  const [gifGridWidth, setGifGridWidth] = useState(0);

  const gifGridStyle = { width: !gifGridWidth ? 0 : gifGridWidth };

  const calculateGridWidth = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    // this is for narrow (phone) screens:
    const gifWidth = availableWidth < 395 ? availableWidth : 395;
    const columnsThatFit = Math.floor((availableWidth + columnGap) / (gifWidth + columnGap));
    const columnAmount = columnsThatFit > 3 ? 3 : columnsThatFit;
    const gridWidth = (columnAmount * gifWidth) + ((columnAmount - 1) * columnGap);
    setGifGridWidth(gridWidth);
  };

  const infiniteScroll = () => {
    const refEl = gifsContainerRef.current;
    if (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight) {
      fetchData();
    }
  };

  useEffect(calculateGridWidth, [width]);

  let content = null;
  if (failedToLoad) {
    content = (
      // If search fails, remove spinner and inform user:
      <p id="error-message">
        Oops, something went wrong with your search. Click <a href='/'>here</a> to refresh.
        {/* <span onClick={() => window.location.reload()}>here</span> */}
      </p>
    );
  } else if (displaySpinner) {
    content = (
      // While search results are loading, render spinner:
      <img id="spinner" alt="Search results are loading" src={spinner} />
    );
  } else {
    content = (
      <>
        <div className='gifs-container' ref={gifsContainerRef} onScroll={infiniteScroll}>
          <div
            className="gifs-grid"
            style={gifGridStyle}
          >
            {gifs.map((gif, index) => (
              <Gif key={index} gifObject={gif} />
            ))}
          </div>
        </div >
      </>
    );
  }

  return content;
}


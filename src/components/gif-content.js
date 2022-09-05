import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import spinner from '../images/spinner.gif'

export function GifContent({ queryApi, gifs, failedToLoad, displaySpinner }) {
  const gifsContainerRef = useRef(null);
  const { width, height } = useWindowSize();
  const [gifsStyles, setGifsStyles] = useState({ width: 0, columnCount: 0, WebkitColumnCount: 0, MozColumnCount: 0 });

  const calculateGifsColumns = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    const gifWidth = 295;
    const totalGifWidth = columnGap + gifWidth;
    let columnAmount = Math.floor((availableWidth + columnGap) / totalGifWidth);
    if (columnAmount > 4) {
      columnAmount = 4;
    }
    const gifsWidth = (columnAmount * totalGifWidth) - columnGap;
    if (columnAmount && gifsWidth) {
      setGifsStyles({ width: gifsWidth, columnCount: columnAmount, WebkitColumnCount: columnAmount, MozColumnCount: columnAmount });
    }
  };

  const infiniteScroll = () => {
    const refEl = gifsContainerRef.current;
    if (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight) {
      queryApi();
    }
    // console.log('refEl?.scrollTop: ', refEl?.scrollTop);
    // console.log('refEl?.clientHeight: ', refEl?.clientHeight);
    // console.log('refEl?.scrollHeight: ', refEl?.scrollHeight);
  };

  // const handleLoading = () => {
  //   if (isLoading && gifs.length) {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(calculateGifsColumns, [width]);
  // useEffect(handleLoading, [isLoading, gifs.length]);

  let content = null;
  if (failedToLoad) {
    content = (
      // If search fails, remove spinner and inform user:
      <p id="error-message">Oops, something went wrong with your search. Check console for error message, or simply try again.</p>
    );
  } else if (displaySpinner) {
    content = (
      // While search results are loading, render spinner:
      <img id="spinner" alt="Search results are loading" src={spinner} />
    );
  } else {
    content = (
      <>
        {/* Search query becomes heading, formatted with capital first letter: */}
        {/* <h2>{gifSearch.charAt(0).toUpperCase() + gifSearch.substring(1).toLowerCase()} GIFs</h2> */}
        <div className='gifs-container' ref={gifsContainerRef} onScroll={infiniteScroll}>
          <div
            className="gifs"
            style={gifsStyles}
          >
            {gifs.map((gif, index) => (
              <img
                key={index}
                alt={gif.title}
                className="gif"
                // style={{ width: gifWidth }}
                // src={gif.images.fixed_width_downsampled.url}
                src={gif.images.fixed_width.url}
                onClick={() => window.open(gif.embed_url, '_blank')}
              />
            ))}
          </div>
        </div >
      </>
    );
  }

  return content;
}


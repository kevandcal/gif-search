import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import spinner from '../images/spinner.gif'

export function GifContent({ fetchData, gifs, queryString, failedToLoad, displaySpinner }) {
  const gifsContainerRef = useRef(null);
  const { width, height } = useWindowSize();
  // const [gifsStyles, setGifsStyles] = useState({ width: 0, columnCount: 0, WebkitColumnCount: 0, MozColumnCount: 0 });
  const [columnCount, setColumnCount] = useState(0);
  const [gifsWidth, setGifsWidth] = useState(0);
  // const [gifWidth, setGifWidth] = useState(0);

  const gifsStyles = { width: gifsWidth, columnCount, WebkitColumnCount: columnCount, MozColumnCount: columnCount };

  const calculateGifsColumns = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    // this is for narrow (phone) screens:
    const gifWidth = availableWidth < 395 ? availableWidth : 395;
    const totalGifWidth = columnGap + gifWidth;
    const columnsThatFit = Math.floor((availableWidth + columnGap) / totalGifWidth);
    const columnAmount = columnsThatFit > 3 ? 3 : columnsThatFit;
    const containerWidth = (columnAmount * totalGifWidth) - columnGap;
    if (columnAmount && containerWidth) {
      // setGifsStyles({ width: containerWidth, columnCount: columnAmount, WebkitColumnCount: columnAmount, MozColumnCount: columnAmount });
      setGifsWidth(containerWidth);
      setColumnCount(columnAmount);
    }
  };

  // const calculateGifWidth = () => {
  //   const availableWidth = width * 0.9 < 1195 ? width * 0.9 : 1195;
  //   const columns = 3;
  //   const columnGap = 5;
  //   const columnGapTotal = columnGap * (columns - 1);
  //   const individualGifWidth = (availableWidth - columnGapTotal) / columns;
  //   setGifWidth(individualGifWidth);
  // };

  const infiniteScroll = () => {
    const refEl = gifsContainerRef.current;
    if (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight) {
      fetchData();
    }
    // console.log('refEl?.scrollTop: ', refEl?.scrollTop);
    // console.log('refEl?.clientHeight: ', refEl?.clientHeight);
    // console.log('refEl?.scrollHeight: ', refEl?.scrollHeight);
  };

  useEffect(calculateGifsColumns, [width]);
  // useEffect(calculateGifWidth, [width]);


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
        {/* Search query becomes heading, formatted with capital first letter: */}
        {/* <h2>{queryString.charAt(0).toUpperCase() + queryString.substring(1).toLowerCase()} GIFs</h2> */}
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


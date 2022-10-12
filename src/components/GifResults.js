import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../helper/window-size';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Gif } from './Gif';
import { MoreButton } from './MoreButton';

export function GifResults({
  fetchData,
  gifs,
  setGifs,
  gifsContainerRef,
  // showMoreBtn,
  failedToLoad,
  displaySpinner,
  setTopBarIsStyled,
  isLowResolution,
  playOnlyOnHover,
  lazyLoadingIsOn
}) {
  const { width, height } = useWindowSize();
  const [gifGridWidth, setGifGridWidth] = useState(0);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const gifGridStyle = { width: !gifGridWidth ? 0 : gifGridWidth };

  const scrollHandler = () => {
    const refEl = gifsContainerRef.current;
    // infinite scroll:
    if (Math.ceil(refEl?.scrollTop + refEl?.clientHeight) >= refEl?.scrollHeight && !showMoreBtn) {
      fetchData();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(refEl.scrollTop >= height * 0.05);
  };

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
      <div id="spinner-container">
        <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />
      </div>
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
      <div className='gifs-container' ref={gifsContainerRef} onScroll={scrollHandler}>
        <div
          className="gifs-grid"
          style={gifGridStyle}
        >
          {gifs.map((gif, index) => (
            <Gif key={index} gifObject={gif} gifsContainerRef={gifsContainerRef} isLowResolution={isLowResolution} playOnlyOnHover={playOnlyOnHover} lazyLoadingIsOn={lazyLoadingIsOn} />
          ))}
        </div>
        <MoreButton
          gifs={gifs}
          setGifs={setGifs}
          gifsContainerRef={gifsContainerRef}
          fetchData={fetchData}
          showMoreBtn={showMoreBtn}
          setShowMoreBtn={setShowMoreBtn}
        />
      </div >
    );
  }

  return content;
}


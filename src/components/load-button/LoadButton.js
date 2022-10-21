import React, { useEffect } from 'react'

export function LoadButton({ gifs, setGifs, gifsContainerRef, fetchData, isDisplayed, threshold, darkModeIsActive }) {

  const loadBtnClassName = darkModeIsActive ? 'dark-mode' : '';

  const handleMoreBtnClick = e => {
    e.preventDefault();
    fetchData();
  };

  const handleMoreGifs = () => {
    // remove previously displayed gifs once click of more button loads more gifs:
    if (gifs.length > threshold) {
      setGifs(prev => prev.slice(threshold));
      gifsContainerRef.current.scroll({ top: 0 });
    }
  };

  useEffect(handleMoreGifs, [gifs.length]);

  return !isDisplayed ? null : (
    <button id='load-button' className={loadBtnClassName} onClick={handleMoreBtnClick}>
      <span id='load-button-text'>LOAD MORE</span>
      <span id='load-button-animation-span' className={loadBtnClassName} />
    </button>
  );
}
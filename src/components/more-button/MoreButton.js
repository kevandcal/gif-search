import React, { useEffect } from 'react'

export function MoreButton({ gifs, setGifs, gifsContainerRef, fetchData, showMoreBtn, threshold }) {

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

  return !showMoreBtn ? null : (
    <button id='more-button' onClick={handleMoreBtnClick}>
      <span id='more-button-text'>LOAD MORE</span>
      <span id='more-button-animation-span' />
    </button>
  );
}
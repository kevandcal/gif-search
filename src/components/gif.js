import React, { useEffect, useRef, useState } from 'react';

export function Gif({ gifObject, isHighResolution, playOnlyOnHover }) {
  const gifRef = useRef(null);
  const { images } = gifObject;
  const [src, setSrc] = useState('');
  const [isInViewport, setIsInViewport] = useState(true); // true as default so that visible gifs are immediately active on load

  const resCondition = isHighResolution ? images.fixed_height.url : images.fixed_height_downsampled.url;

  const handleClick = () => window.open(gifObject.embed_url, '_blank');

  const handleMouseEnter = () => {
    if (playOnlyOnHover) {
      setSrc(resCondition);
    }
  };

  const handleMouseLeave = () => {
    if (playOnlyOnHover) {
      setSrc(images.fixed_height_still.url);
    }
  };

  const checkWhetherInViewport = () => {
    const windowHeight = window.innerHeight;
    // const boundaryTop = 50 + (windowHeight * 0.1); // 50px search bar plus 10vh padding 
    const boundaryTop = 70;
    const boundaryBottom = windowHeight * 0.95; // 5vh margin bottom
    const { top: gifTop, bottom: gifBottom } = gifRef.current.getBoundingClientRect();
    const isInBounds = gifBottom > boundaryTop && gifTop < boundaryBottom;
    setIsInViewport(isInBounds);
    // const isFullyInBounds = gifTop >= boundaryTop && gifBottom <= boundaryBottom;
    // setIsInViewport(isFullyInBounds);
  };

  const checkIntervalViewport = () => {
    const intervalId = setInterval(checkWhetherInViewport, 1000);
    return () => clearInterval(intervalId);
  };

  const updateSrc = () => {
    let url;
    if (playOnlyOnHover) {
      url = images.fixed_height_still.url;
    } else {
      url = !isInViewport ? images.fixed_height_still.url : resCondition;
    }
    setSrc(url);
  };

  useEffect(checkIntervalViewport, []);
  useEffect(updateSrc, [isInViewport, isHighResolution, playOnlyOnHover]);

  return !src ? null : (
    <img
      ref={gifRef}
      alt={gifObject.title}
      className="gif"
      src={src}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
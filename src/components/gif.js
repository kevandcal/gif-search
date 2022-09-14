import React, { useEffect, useRef, useState } from 'react';

export function Gif({ gifObject, isHighResolution }) {
  const gifRef = useRef(null);
  const { images } = gifObject;
  const resCondition = isHighResolution ? images.fixed_height.url : images.fixed_height_downsampled.url;
  const [src, setSrc] = useState(resCondition);

  const handleClick = () => window.open(gifObject.embed_url, '_blank');

  const updateSrc = isInViewport => {
    const url = !isInViewport ? images.fixed_height_still.url : resCondition;
    setSrc(url);
  };

  const checkWhetherInViewport = () => {
    const windowHeight = window.innerHeight;
    // const boundaryTop = 50 + (windowHeight * 0.1); // 50px search bar plus 10vh padding 
    const boundaryTop = 70;
    const boundaryBottom = windowHeight * 0.95; // 5vh margin bottom
    const { top: gifTop, bottom: gifBottom } = gifRef.current.getBoundingClientRect();
    const isInBounds = gifBottom > boundaryTop && gifTop < boundaryBottom;
    updateSrc(isInBounds);
    // const isFullyInBounds = gifTop >= boundaryTop && gifBottom <= boundaryBottom;
    // updateSrc(isFullyInBounds);
  };

  const intervalViewportCheck = () => {
    const intervalId = setInterval(checkWhetherInViewport, 1000);
    return () => clearInterval(intervalId);
  };

  useEffect(intervalViewportCheck, []);
  // useEffect(checkWhetherInViewport, []);

  // useEffect(checkWhetherInViewport, [gifRef.current?.getBoundingClientRect().y]);
  // useEffect(updateGifOffsetY, [gifRef.current?.getBoundingClientRect().y]);
  // useEffect(updateSrc, []);

  // return !src ? <div ref={gifRef} className="gif" /> : (
  return (
    <img
      ref={gifRef}
      alt={gifObject.title}
      className="gif"
      src={src}
      onClick={handleClick}
    />
  );
}
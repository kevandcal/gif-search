import React, { useEffect, useRef, useState } from 'react';

export function Gif({ gifObject, gifsContainerRef, isLowResolution, playOnlyOnHover, lazyLoadingIsOn }) {
  const { images } = gifObject;
  const gifRef = useRef(null);
  const io = useRef(null);
  const [src, setSrc] = useState('');
  const [isInViewport, setIsInViewport] = useState(false);

  const displayImg = isInViewport || !lazyLoadingIsOn;

  const stillUrl = images.fixed_height_still.url;
  const properResolutionUrl = isLowResolution ? images.fixed_height_downsampled.url : images.fixed_height.url;

  const handleMouseEnter = () => {
    if (playOnlyOnHover) {
      setSrc(properResolutionUrl);
    }
  };

  const handleMouseLeave = () => {
    if (playOnlyOnHover) {
      setSrc(stillUrl);
    }
  };

  const openGiphyPageForGif = () => window.open(gifObject.embed_url, '_blank');

  // inspired by https://levelup.gitconnected.com/how-to-implement-lazy-loading-in-react-with-intersection-observer-61c0e53ec8d:
  const handleLazyLoad = () => {
    if (!lazyLoadingIsOn) {
      return;
    }
    const currentGifRef = gifRef.current;
    if (currentGifRef) {
      io.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => setIsInViewport(entry.isIntersecting));
        },
        { root: gifsContainerRef.current }
      );
      io.current.observe(currentGifRef);
    }
    return () => io.current.unobserve(currentGifRef);
  };

  const updateSrc = () => {
    const url = playOnlyOnHover ? stillUrl : properResolutionUrl;
    setSrc(url);
  };

  useEffect(handleLazyLoad, [gifRef, gifsContainerRef, lazyLoadingIsOn]);
  useEffect(updateSrc, [isLowResolution, playOnlyOnHover, gifObject]);

  return (
    <div ref={gifRef} className="gif">
      {!displayImg ? null : (
        <img
          alt={gifObject.title}
          src={src}
          onClick={openGiphyPageForGif}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
}

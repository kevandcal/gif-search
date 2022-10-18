import React, { useEffect, useMemo, useRef, useState } from 'react';

export function Gif({ gifObject, gifsContainerRef, isLowResolution, playOnlyOnHover, lazyLoadingIsOn }) {
  const { images } = gifObject;
  const gifRef = useRef(null);
  const io = useRef(null);
  const [src, setSrc] = useState('');
  const [isInViewport, setIsInViewport] = useState(false);

  const properResolutionUrl = useMemo(() => (
    isLowResolution ? images.fixed_height_downsampled.url : images.fixed_height.url
  ), [isLowResolution, images]);

  const alt = useMemo(() => (
    isInViewport ? gifObject.title : ''
  ), [isInViewport, gifObject]);

  const handleClick = () => window.open(gifObject.embed_url, '_blank');

  const handleMouseEnter = () => {
    if (playOnlyOnHover) {
      setSrc(properResolutionUrl);
    }
  };

  const handleMouseLeave = () => {
    if (playOnlyOnHover) {
      setSrc(images.fixed_height_still.url);
    }
  };

  // inspired by https://levelup.gitconnected.com/how-to-implement-lazy-loading-in-react-with-intersection-observer-61c0e53ec8d:
  const handleLazyLoad = () => {
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
    let url = '';
    if (isInViewport || !lazyLoadingIsOn) {
      url = playOnlyOnHover ? images.fixed_height_still.url : properResolutionUrl;
    }
    setSrc(url);
  };

  useEffect(handleLazyLoad, [gifRef, gifsContainerRef]);
  useEffect(updateSrc, [isInViewport, isLowResolution, playOnlyOnHover])

  return (
    <img
      ref={gifRef}
      alt={alt}
      className="gif"
      src={src}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

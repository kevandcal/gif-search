import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import './Gif.css';

type GifProps = {
  images: { [key: string]: { url: string } };
  url: string;
  title: string;
  // gifsContainerRef: ;
};

export function Gif({ images, url, title, gifsContainerRef }: GifProps) {
  const { isLowResolution, playOnlyOnHover, lazyLoadingIsOn } = useSettings();
  const gifRef = useRef(null);
  const io = useRef(null);
  const [src, setSrc] = useState('');
  const [isInViewport, setIsInViewport] = useState(false);

  const stillUrl = images.fixed_height_still.url;
  const properResolutionUrl = isLowResolution ? images.fixed_height_downsampled.url : images.fixed_height.url;

  const displayImg = isInViewport || !lazyLoadingIsOn;

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

  const openGiphyPageForGif = () => window.open(url, '_blank');

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
  useEffect(updateSrc, [playOnlyOnHover, stillUrl, properResolutionUrl]);

  return (
    <div ref={gifRef} className="gif">
      {!displayImg ? null : (
        <img
          alt={title}
          src={src}
          onClick={openGiphyPageForGif}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
}

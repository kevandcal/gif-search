import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { GifsInterface } from '../app/App';
import './Gif.css';

interface GifProps extends GifsInterface {
  gifsContainerRef: RefObject<HTMLElement>;
};

export function Gif({ images, url, title, gifsContainerRef }: GifProps) {
  const { isLowResolution, playOnlyOnHover, lazyLoadingIsOn } = useSettings();
  const gifRef = useRef<HTMLDivElement>(null);
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

  // inspired by https://stackoverflow.com/questions/73051303/intersection-observer-in-typescript-throws-error-in-useref:
  const handleLazyLoad = () => {
    if (!lazyLoadingIsOn) {
      return;
    }
    const intObsCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => setIsInViewport(entry.isIntersecting));
    };
    const options = { root: gifsContainerRef.current };
    const observer = new IntersectionObserver(intObsCallback, options);
    const curGif = gifRef.current;
    if (curGif) {
      observer.observe(curGif);
    }
    return () => {
      curGif && observer.unobserve(curGif);
    };
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

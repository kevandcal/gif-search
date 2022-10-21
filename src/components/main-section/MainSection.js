import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { GifResults } from '../gif-results/GifResults';
import { MoreButton } from '../more-button/MoreButton';

export function MainSection({
  gifs,
  setGifs,
  gifsContainerRef,
  fetchData,
  apiLimit,
  failedToLoad,
  isLoading,
  apiResOffset,
  isLowResolution,
  darkModeIsActive,
  playOnlyOnHover,
  lazyLoadingIsOn,
  setTopBarIsStyled
}) {
  const { height } = useWindowSize();

  const threshold = apiLimit * 4;
  const showMoreBtn = gifs.length && gifs.length % threshold === 0;
  const displaySpinner = isLoading && apiResOffset === 0;

  const handleScroll = () => {
    const refEl = gifsContainerRef.current;
    // infinite scroll:
    if (Math.ceil(refEl?.scrollTop + refEl?.clientHeight) >= refEl?.scrollHeight && !showMoreBtn) {
      fetchData();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(refEl.scrollTop >= height * 0.05);
  };

  return (
    <main ref={gifsContainerRef} onScroll={handleScroll}>
      <GifResults
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
        failedToLoad={failedToLoad}
        displaySpinner={displaySpinner}
        isLowResolution={isLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
      />
      <MoreButton
        gifs={gifs}
        setGifs={setGifs}
        gifsContainerRef={gifsContainerRef}
        fetchData={fetchData}
        showMoreBtn={showMoreBtn}
        threshold={threshold}
        darkModeIsActive={darkModeIsActive}
      />
    </main>
  )
}

import React, { useRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { GifSearchResults } from '../gif-search-results/GifSearchResults';
import { LoadButton } from '../load-button/LoadButton';
import './MainSection.css';

export function MainSection({
  gifs,
  fetchGifs,
  gifsPerRequest,
  failedToLoad,
  isLoading,
  allGifsFetched,
  apiResOffset,
  setTopBarIsStyled,
  infiniteScrollIsActive
}) {
  const { height } = useWindowSize();
  const gifsContainerRef = useRef(null);

  const displayAnyBtn = !infiniteScrollIsActive && gifs.length;
  const displayLoadMoreBtn = displayAnyBtn && !allGifsFetched;
  const displayGoBackBtn = displayAnyBtn && apiResOffset > gifsPerRequest;

  const handleScroll = () => {
    const refEl = gifsContainerRef.current;
    // infinite scroll:
    if (
      infiniteScrollIsActive &&
      !allGifsFetched &&
      (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight - 2)
    ) {
      fetchGifs();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(refEl.scrollTop >= height * 0.05);
  };

  const handleGoBackBtnClick = e => {
    e.preventDefault();
    const offset = apiResOffset - (gifsPerRequest * 2);
    fetchGifs(undefined, offset);
  };

  const handleMoreBtnClick = e => {
    e.preventDefault();
    fetchGifs();
    gifsContainerRef.current.scroll({ top: 0 });
  };

  return (
    <main ref={gifsContainerRef} onScroll={handleScroll}>
      <div id='go-back-btn-container'>
        <LoadButton
          text='Go Back'
          onClick={handleGoBackBtnClick}
          isDisplayed={displayGoBackBtn}
        />
      </div>
      <GifSearchResults
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
        isLoading={isLoading}
        failedToLoad={failedToLoad}
        allGifsFetched={allGifsFetched}
      />
      <div id='load-more-btn-container'>
        <LoadButton
          text='Load More'
          onClick={handleMoreBtnClick}
          isDisplayed={displayLoadMoreBtn}
        />
      </div>
    </main>
  )
}
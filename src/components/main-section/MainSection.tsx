import React, { Dispatch, MouseEvent, SetStateAction, useRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { GifSearchResults } from '../gif-search-results/GifSearchResults';
import { LoadButton } from '../load-button/LoadButton';
import './MainSection.css';

type MainSectionProps = {
  gifs: object[];
  fetchGifs: (query?: string | undefined, offset?: number | undefined) => Promise<void>;
  gifsPerRequest: 18 | 30;
  failedToLoad: boolean;
  isLoading: boolean;
  allGifsFetched: boolean;
  apiResOffset: number;
  setTopBarIsStyled: Dispatch<SetStateAction<boolean>>;
  infiniteScrollIsActive: boolean;
};

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
}: MainSectionProps) {
  const { height } = useWindowSize();
  const gifsContainerRef = useRef<HTMLElement>(null);

  const displayAnyBtn = !infiniteScrollIsActive && gifs.length;
  const displayLoadMoreBtn = !!displayAnyBtn && !allGifsFetched;
  const displayGoBackBtn = !!displayAnyBtn && apiResOffset > gifsPerRequest;

  const handleScroll = () => {
    const refEl = gifsContainerRef.current;
    if (!refEl) {
      return;
    }
    const scrolledNearBottom = refEl.scrollTop + refEl.clientHeight >= refEl.scrollHeight - 2;
    // infinite scroll
    if (infiniteScrollIsActive && !allGifsFetched && scrolledNearBottom) {
      fetchGifs();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(!!height && refEl.scrollTop >= height * 0.05);
  };

  const handleGoBackBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const offset = apiResOffset - (gifsPerRequest * 2);
    // fetchGifs(undefined, offset);
    const o = apiResOffset - (gifsPerRequest * 2);
    fetchGifs(undefined, o);
  };

  const handleMoreBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchGifs();
    gifsContainerRef?.current?.scroll({ top: 0 });
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

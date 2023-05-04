import React, { memo, MutableRefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GifsGrid } from '../gifs-grid/GifsGrid';
import { LoadButton } from '../load-button/LoadButton';
import './GifSearchResults.css';

type GifSearchResultsProps = {
  gifs: object[];
  gifsContainerRef: MutableRefObject<HTMLElement | null>;
  isLoading: boolean;
  failedToLoad: boolean;
  allGifsFetched: boolean;
};

export const GifSearchResults = memo(({
  gifs,
  gifsContainerRef,
  isLoading,
  failedToLoad,
  allGifsFetched
}: GifSearchResultsProps) => {
  const displaySpinner = isLoading && !gifs.length;
  const noResults = allGifsFetched && !gifs.length;

  if (displaySpinner) {
    // while initial search results are loading, render spinner:
    return <FontAwesomeIcon icon={faSpinner} id="spinner" className='fa-spin' />;
  } else if (failedToLoad) {
    // if search fails, remove spinner and inform user:
    return <Message text='Oops, something went wrong with your search.' />;
  } else if (noResults) {
    // if search yields no results, remove spinner and inform user:
    return <Message text='No results were found.' />;
  } else {
    return (
      <>
        <GifsGrid
          gifs={gifs}
          gifsContainerRef={gifsContainerRef}
        />
        {allGifsFetched && <Message text='All relevant GIFs have been displayed.' />}
      </>
    );
  }
});


function Message({ text }: { text: string }) {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div id="message">
      <p id='message-text'>{text}</p>
      <LoadButton
        text='Refresh'
        onClick={refreshPage}
        isDisplayed={true}
      />
    </div>
  );
}
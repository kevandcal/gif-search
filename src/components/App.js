import React, { useState, useEffect, useRef } from 'react';
import { API_KEY } from '../secrets.json';
import { useWindowSize } from '../hooks/useWindowSize';
import { TopBar } from './TopBar';
import { GifResults } from './GifResults';
import { MoreButton } from './MoreButton';

export function App() {
  const trendingGifsQueryCode = 'jlkasdfpoiqwerklnazxcmvasjf';
  const { height } = useWindowSize();
  const gifsContainerRef = useRef(null);
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState(trendingGifsQueryCode);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [isLowResolution, setIsLowResolution] = useState(false);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useState(false);
  const [lazyLoadingIsOn, setLazyLoadingIsOn] = useState(true);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const displaySpinner = isLoading && apiResOffset === 0;

  const fetchData = () => {
    const queryApi = async () => {
      setIsLoading(true);
      setShowMoreBtn(false);
      const limit = 18;
      const searchForTrending = queryString === trendingGifsQueryCode;
      const endpoint = searchForTrending ? 'trending' : 'search';
      const q = searchForTrending ? '' : `&q=${queryString}`;
      // modifying the URL for trending gifs finds currently trending gifs rather than gifs about trending
      const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${API_KEY}${q}&limit=${limit}&offset=${apiResOffset}`;
      const response = await fetch(url);
      const { data, meta } = await response.json();
      setIsLoading(false);
      const statusNotOk = meta.status < 200 || meta.status > 299;
      if (!statusNotOk && data.length) {
        setGifs(gifs.concat(data))
        setApiResOffset(apiResOffset + limit);
      } else {
        setFailedToLoad(true);
      }
    };
    if (queryString && !isLoading) {
      queryApi();
    }
  };

  const scrollHandler = () => {
    const refEl = gifsContainerRef.current;
    // infinite scroll:
    if (Math.ceil(refEl?.scrollTop + refEl?.clientHeight) >= refEl?.scrollHeight && !showMoreBtn) {
      fetchData();
    }
    // change top bar styling when scrolled beyond 5vh:
    setTopBarIsStyled(refEl.scrollTop >= height * 0.05);
  };

  const handleLoading = () => {
    if (isLoading && gifs.length) {
      setIsLoading(false);
    }
  };

  useEffect(fetchData, [queryString]);
  useEffect(handleLoading, [isLoading, gifs.length]);

  return (
    <>
      <TopBar
        trendingGifsQueryCode={trendingGifsQueryCode}
        gifsContainerRef={gifsContainerRef}
        queryString={queryString}
        setQueryString={setQueryString}
        setGifs={setGifs}
        setApiResOffset={setApiResOffset}
        setFailedToLoad={setFailedToLoad}
        topBarIsStyled={topBarIsStyled}
        setTopBarIsStyled={setTopBarIsStyled}
        isLowResolution={isLowResolution}
        setIsLowResolution={setIsLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        setPlayOnlyOnHover={setPlayOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
        setLazyLoadingIsOn={setLazyLoadingIsOn}
      />
      <div className='gifs-container' ref={gifsContainerRef} onScroll={scrollHandler}>
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
          setShowMoreBtn={setShowMoreBtn}
        />
      </div>
      <footer><span id='attribution'>Powered by GIPHY</span></footer>
    </>
  );
}


import React, { useEffect, useRef, useState } from 'react';
import { API_KEY } from '../../secrets.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TopBar } from '../top-bar/TopBar';
import { MainSection } from '../main-section/MainSection';

export function App() {
  const trendingGifsQueryCode = 'ultratopsecrettrendinggifscode';
  const gifsContainerRef = useRef(null);
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState(trendingGifsQueryCode);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [isLowResolution, setIsLowResolution] = useLocalStorage('lowResolution', false);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useLocalStorage('playOnlyOnHover', false);
  const [lazyLoadingIsOn, setLazyLoadingIsOn] = useLocalStorage('lazyLoading', true);
  const [infiniteScrollIsActive, setInfiniteScrollIsActive] = useLocalStorage('infiniteScroll', true);
  const [darkModeIsActive, setDarkModeIsActive] = useLocalStorage('darkMode', false);


  const gifsPerRequest = infiniteScrollIsActive ? 18 : 30;

  const queryApi = async (offset = apiResOffset) => {
    setIsLoading(true);
    const searchForTrending = queryString === trendingGifsQueryCode;
    const path = searchForTrending ? 'trending' : 'search';
    const q = searchForTrending ? '' : `&q=${queryString}`;
    // trending path finds currently trending gifs instead of searching for gifs about trending:
    const url = `https://api.giphy.com/v1/gifs/${path}?api_key=${API_KEY}${q}&limit=${gifsPerRequest}&offset=${offset}`;
    const response = await fetch(url);
    const { data, meta } = await response.json();
    setIsLoading(false);
    const statusNotOk = meta.status < 200 || meta.status > 299;
    if (!statusNotOk && data.length) {
      setGifs(prev => infiniteScrollIsActive ? prev.concat(data) : data);
      setApiResOffset(offset + gifsPerRequest);
    } else {
      setFailedToLoad(true);
    }
  };

  const fetchData = offset => {
    if (queryString && !isLoading) {
      queryApi(offset);
    }
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
        setFailedToLoad={setFailedToLoad}
        topBarIsStyled={topBarIsStyled}
        setTopBarIsStyled={setTopBarIsStyled}
        isLowResolution={isLowResolution}
        setIsLowResolution={setIsLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        setPlayOnlyOnHover={setPlayOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
        setLazyLoadingIsOn={setLazyLoadingIsOn}
        darkModeIsActive={darkModeIsActive}
        setDarkModeIsActive={setDarkModeIsActive}
        infiniteScrollIsActive={infiniteScrollIsActive}
        setInfiniteScrollIsActive={setInfiniteScrollIsActive}
      />
      <MainSection
        gifs={gifs}
        setGifs={setGifs}
        gifsContainerRef={gifsContainerRef}
        fetchData={fetchData}
        gifsPerRequest={gifsPerRequest}
        failedToLoad={failedToLoad}
        isLoading={isLoading}
        apiResOffset={apiResOffset}
        isLowResolution={isLowResolution}
        darkModeIsActive={darkModeIsActive}
        playOnlyOnHover={playOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
        setTopBarIsStyled={setTopBarIsStyled}
        infiniteScrollIsActive={infiniteScrollIsActive}
      />
      <footer>
        <span id='attribution'>Powered by GIPHY</span>
      </footer>
    </>
  );
}


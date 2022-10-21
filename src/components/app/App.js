import React, { useEffect, useRef, useState } from 'react';
import { API_KEY } from '../../secrets.json';
import { TopBar } from '../top-bar/TopBar';
import { MainSection } from '../main-section/MainSection';

export function App() {
  const trendingGifsQueryCode = 'congratsyouhavefoundthesecrettrendinggifscode';
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
  const [darkModeIsActive, setDarkModeIsActive] = useState(false);

  const apiLimit = 18;

  const queryApi = async () => {
    setIsLoading(true);
    const searchForTrending = queryString === trendingGifsQueryCode;
    const path = searchForTrending ? 'trending' : 'search';
    const q = searchForTrending ? '' : `&q=${queryString}`;
    // trending path finds currently trending gifs instead of searching for gifs about trending:
    const url = `https://api.giphy.com/v1/gifs/${path}?api_key=${API_KEY}${q}&limit=${apiLimit}&offset=${apiResOffset}`;
    const response = await fetch(url);
    const { data, meta } = await response.json();
    setIsLoading(false);
    const statusNotOk = meta.status < 200 || meta.status > 299;
    if (!statusNotOk && data.length) {
      setGifs(gifs.concat(data))
      setApiResOffset(prev => prev + apiLimit);
    } else {
      setFailedToLoad(true);
    }
  };

  const fetchData = () => {
    if (queryString && !isLoading) {
      queryApi();
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
        darkModeIsActive={darkModeIsActive}
        setDarkModeIsActive={setDarkModeIsActive}
      />
      <MainSection
        gifs={gifs}
        setGifs={setGifs}
        gifsContainerRef={gifsContainerRef}
        fetchData={fetchData}
        apiLimit={apiLimit}
        failedToLoad={failedToLoad}
        isLoading={isLoading}
        apiResOffset={apiResOffset}
        isLowResolution={isLowResolution}
        darkModeIsActive={darkModeIsActive}
        playOnlyOnHover={playOnlyOnHover}
        lazyLoadingIsOn={lazyLoadingIsOn}
        setTopBarIsStyled={setTopBarIsStyled}
      />
      <footer>
        <span id='attribution'>Powered by GIPHY</span>
      </footer>
    </>
  );
}


import React, { useEffect, useId, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TopBar } from '../top-bar/TopBar';
import { MainSection } from '../main-section/MainSection';
import { SettingsProvider } from '../../context/settings-context';

export function App() {
  const trendingGifsQueryCode = useId();
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState(trendingGifsQueryCode);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [allGifsFetched, setAllGifsFetched] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [infiniteScrollIsActive, setInfiniteScrollIsActive] = useLocalStorage('infiniteScroll', true);

  const gifsPerRequest = infiniteScrollIsActive ? 18 : 30;

  const fetchGifs = async (query = queryString, offset = apiResOffset) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setAllGifsFetched(false);
    const searchForTrending = query === trendingGifsQueryCode;
    const path = searchForTrending ? 'trending' : 'search';
    const q = searchForTrending ? '' : `&q=${query}`;
    // trending path finds currently trending gifs instead of searching for gifs about trending:
    const url = `https://api.giphy.com/v1/gifs/${path}?api_key=${process.env.REACT_APP_GIPHY_API_KEY}${q}&limit=${gifsPerRequest}&offset=${offset}`;
    const response = await fetch(url);
    const { data, meta: { status }, pagination: { total_count: totalCount } } = await response.json();
    setIsLoading(false);
    if (status < 200 || status > 299) {
      setFailedToLoad(true);
    } else if (data.length) {
      setGifs(prev => infiniteScrollIsActive ? prev.concat(data) : data);
      const newOffset = offset + Math.min(data.length, gifsPerRequest);
      setApiResOffset(newOffset);
      setAllGifsFetched(newOffset >= totalCount);
    } else {
      setAllGifsFetched(true);
    }
  };

  const fetchGifsOnMount = () => {
    fetchGifs();
  };

  // eslint-disable-next-line
  useEffect(fetchGifsOnMount, []);

  return (
    <SettingsProvider>
      <TopBar
        trendingGifsQueryCode={trendingGifsQueryCode}
        queryString={queryString}
        setQueryString={setQueryString}
        setGifs={setGifs}
        fetchGifs={fetchGifs}
        setFailedToLoad={setFailedToLoad}
        topBarIsStyled={topBarIsStyled}
        infiniteScrollIsActive={infiniteScrollIsActive}
        setInfiniteScrollIsActive={setInfiniteScrollIsActive}
      />
      <MainSection
        gifs={gifs}
        setGifs={setGifs}
        queryString={queryString}
        fetchGifs={fetchGifs}
        gifsPerRequest={gifsPerRequest}
        failedToLoad={failedToLoad}
        allGifsFetched={allGifsFetched}
        isLoading={isLoading}
        apiResOffset={apiResOffset}
        setTopBarIsStyled={setTopBarIsStyled}
        infiniteScrollIsActive={infiniteScrollIsActive}
      />
      <footer>
        <span id='attribution'>Powered by GIPHY</span>
      </footer>
    </SettingsProvider>
  );
}


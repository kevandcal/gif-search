import React, { useEffect, useMemo, useState } from 'react';
import { API_KEY } from '../../secrets.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TopBar } from '../top-bar/TopBar';
import { MainSection } from '../main-section/MainSection';
import { SettingsProvider } from '../../context/settings-context';

export function App() {
  const trendingGifsQueryCode = useMemo(() => String(Math.random()), []);
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState(trendingGifsQueryCode);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [infiniteScrollIsActive, setInfiniteScrollIsActive] = useLocalStorage('infiniteScroll', true);

  const gifsPerRequest = infiniteScrollIsActive ? 18 : 30;

  const fetchGifs = async (query = queryString, offset = apiResOffset) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const searchForTrending = query === trendingGifsQueryCode;
    const path = searchForTrending ? 'trending' : 'search';
    const q = searchForTrending ? '' : `&q=${query}`;
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

  const fetchGifsOnMount = () => {
    fetchGifs();
  };

  const handleLoading = () => {
    if (isLoading && gifs.length) {
      setIsLoading(false);
    }
  };

  useEffect(fetchGifsOnMount, []);
  useEffect(handleLoading, [isLoading, gifs.length]);

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


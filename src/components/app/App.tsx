import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TopBar } from '../top-bar/TopBar';
import { MainSection } from '../main-section/MainSection';
import { SettingsProvider } from '../../context/settings-context';
import './App.css';

// type GiphyData = {
//   id: string;
//   images: object[];
//   title: string;
//   embed_url: string;
// };

export function App() {
  const trendingGifsQueryCode = useId();
  const queryRef = useRef<string>(trendingGifsQueryCode);
  const [gifs, setGifs] = useState<object[]>([]);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [allGifsFetched, setAllGifsFetched] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [infiniteScrollIsActive, setInfiniteScrollIsActive] = useLocalStorage('infiniteScroll', true);

  const gifsPerRequest = infiniteScrollIsActive ? 18 : 30;

  const fetchGifs = async (query: string | undefined = queryRef.current, offset: number | undefined = apiResOffset) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const searchForTrending = query === trendingGifsQueryCode;
    const path = searchForTrending ? 'trending' : 'search';
    const q = searchForTrending ? '' : `&q=${query}`;
    // trending path finds currently trending gifs instead of searching for gifs about trending:
    const url = `https://api.giphy.com/v1/gifs/${path}?api_key=${import.meta.env.VITE_GIPHY_API_KEY}${q}&limit=${gifsPerRequest}&offset=${offset}`;
    const response = await fetch(url);
    const { data, meta: { status }, pagination: { total_count: totalCount } } = await response.json();
    setIsLoading(false);
    if (status < 200 || status > 299) {
      setFailedToLoad(true);
    } else if (data.length) {
      // const filteredData = data.map(({ id, images, title, embed_url: url }: GiphyData) => (
      //   { id, images, title, url }
      // ));
      // setGifs(prev => infiniteScrollIsActive ? prev.concat(filteredData) : filteredData);
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
  useEffect(() => console.log('gifs:', gifs), [gifs]);

  return (
    <SettingsProvider>
      <TopBar
        trendingGifsQueryCode={trendingGifsQueryCode}
        queryRef={queryRef}
        setGifs={setGifs}
        fetchGifs={fetchGifs}
        setFailedToLoad={setFailedToLoad}
        topBarIsStyled={topBarIsStyled}
        infiniteScrollIsActive={infiniteScrollIsActive}
        setInfiniteScrollIsActive={setInfiniteScrollIsActive}
      />
      <MainSection
        gifs={gifs}
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


import React, { useState, useEffect, useRef } from 'react';
import { API_KEY } from '../secrets.json';
import { TopBar } from './TopBar';
import { GifContent } from './GifContent';
// import UserSearchGifs from './UserSearchGifs';
// import TrendingGifs from './TrendingGifs';

export function App() {
  const trendingGifsQueryCode = 'ljasdfkjlafjlkdfsajkladfskjldfljk';
  const gifsContainerRef = useRef(null);
  const [gifs, setGifs] = useState([]);
  // const [queryString, setQueryString] = useState('');
  const [queryString, setQueryString] = useState(trendingGifsQueryCode);
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [isLowResolution, setIsLowResolution] = useState(false);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useState(false);
  const [lazyLoadingIsOn, setLazyLoadingIsOn] = useState(true);

  const displaySpinner = isLoading && apiResOffset === 0;

  const fetchData = () => {
    const queryApi = async () => {
      setIsLoading(true);
      const limit = !apiResOffset ? 18 : 12; // requests 18 gifs initially, adds 12 at a time thereafter
      // const searchForTrending = queryString === 'home-trending-default';
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
        // handle errors:
        setFailedToLoad(true);
        // const error = statusNotOk ? meta.msg : 'No valid results';
        // throw new Error(error);
      }
    };
    if (queryString && !isLoading) {
      queryApi();
    }
  };

  const handleLoading = () => {
    if (isLoading && gifs.length) {
      setIsLoading(false);
    }
  };

  // const loadTrendingGifs = () => setQueryString(trendingGifsQueryCode);
  // const setTrendingGifsOnLoad = () => setQueryString('home-trending-default');

  useEffect(fetchData, [queryString]);
  useEffect(() => console.log('queryString: ', queryString), [queryString]);
  useEffect(handleLoading, [isLoading, gifs.length]);
  // useEffect(setTrendingGifsOnLoad, []);
  // useEffect(loadTrendingGifs, []);

  return (
    <React.Fragment>
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
      <GifContent
        fetchData={fetchData}
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
        failedToLoad={failedToLoad}
        displaySpinner={displaySpinner}
        setTopBarIsStyled={setTopBarIsStyled}
        isLowResolution={isLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        setApiResOffset={setApiResOffset}
        lazyLoadingIsOn={lazyLoadingIsOn}
      />
      <footer><span id='attribution'>Powered by GIPHY</span></footer>
    </React.Fragment>
  );
}


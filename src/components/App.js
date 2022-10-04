import React, { useState, useEffect, useRef } from 'react';
import { API_KEY } from '../secrets.json';
import { TopBar } from './TopBar';
import { GifContent } from './GifContent';
// import UserSearchGifs from './UserSearchGifs';
// import TrendingGifs from './TrendingGifs';

export function App() {
  const gifsContainerRef = useRef(null);
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [apiResOffset, setApiResOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [isLowResolution, setIsLowResolution] = useState(false);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useState(false);

  const displaySpinner = isLoading && apiResOffset === 0;

  const fetchData = () => {
    const queryApi = async () => {
      setIsLoading(true);
      const limit = !apiResOffset ? 18 : 12; // requests 18 gifs initially, adds 12 at a time thereafter
      const searchForTrending = queryString === 'trending';
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

  const setTrendingGifsOnLoad = () => setQueryString('trending');

  useEffect(fetchData, [queryString]);
  useEffect(handleLoading, [isLoading, gifs.length]);
  useEffect(setTrendingGifsOnLoad, []);

  return (
    <React.Fragment>
      <TopBar
        queryString={queryString}
        gifsContainerRef={gifsContainerRef}
        setQueryString={setQueryString}
        setGifs={setGifs}
        setApiResOffset={setApiResOffset}
        setFailedToLoad={setFailedToLoad}
        topBarIsStyled={topBarIsStyled}
        setTopBarIsStyled={setTopBarIsStyled}
        setIsLowResolution={setIsLowResolution}
        setPlayOnlyOnHover={setPlayOnlyOnHover} />
      <GifContent
        fetchData={fetchData}
        gifs={gifs}
        gifsContainerRef={gifsContainerRef}
        failedToLoad={failedToLoad}
        displaySpinner={displaySpinner}
        setTopBarIsStyled={setTopBarIsStyled}
        isLowResolution={isLowResolution}
        playOnlyOnHover={playOnlyOnHover}
        setApiResOffset={setApiResOffset} />
    </React.Fragment>
  );
}


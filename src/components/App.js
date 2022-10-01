import React, { useState, useEffect } from 'react';
import { API_KEY } from '../secrets.json';
import { TopBar } from './TopBar';
import { GifContent } from './GifContent';
// import UserSearchGifs from './UserSearchGifs';
// import TrendingGifs from './TrendingGifs';

export function App() {
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [topBarIsStyled, setTopBarIsStyled] = useState(false);
  const [isHighResolution, setIsHighResolution] = useState(true);
  const [playOnlyOnHover, setPlayOnlyOnHover] = useState(false);

  const displaySpinner = isLoading && offset === 0;

  const fetchData = () => {
    const queryApi = async () => {
      setIsLoading(true);
      const limit = !offset ? 18 : 12; // requests 18 gifs initially, adds 12 at a time thereafter
      const searchForTrending = queryString === 'trending';
      const endpoint = searchForTrending ? 'trending' : 'search';
      const q = searchForTrending ? '' : `&q=${queryString}`;
      // modifying the URL for trending gifs finds currently trending gifs rather than gifs about trending
      const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${API_KEY}${q}&limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const { data, meta } = await response.json();
      setIsLoading(false);
      const statusNotOk = meta.status < 200 || meta.status > 299;
      if (!statusNotOk && data.length) {
        setGifs(gifs.concat(data))
        setOffset(offset + limit);
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
      {/* <UserSearchGifs /> */}
      {/* <TrendingGifs /> */}
      <TopBar queryString={queryString} setQueryString={setQueryString} setGifs={setGifs} setOffset={setOffset} setFailedToLoad={setFailedToLoad} topBarIsStyled={topBarIsStyled} setTopBarIsStyled={setTopBarIsStyled} isHighResolution={isHighResolution} setIsHighResolution={setIsHighResolution} playOnlyOnHover={playOnlyOnHover} setPlayOnlyOnHover={setPlayOnlyOnHover} />
      <GifContent fetchData={fetchData} gifs={gifs} failedToLoad={failedToLoad} displaySpinner={displaySpinner} setTopBarIsStyled={setTopBarIsStyled} isHighResolution={isHighResolution} playOnlyOnHover={playOnlyOnHover} setOffset={setOffset} />
    </React.Fragment>
  );
}


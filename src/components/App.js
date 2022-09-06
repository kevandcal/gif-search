import React, { useState, useEffect } from 'react';
import { API_KEY } from '../secrets.json';
import { TopBar } from './top-bar';
import { GifContent } from './gif-content';
// import UserSearchGifs from './UserSearchGifs';
// import TrendingGifs from './TrendingGifs';

export function App() {
  const [gifs, setGifs] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [failedToLoad, setFailedToLoad] = useState(false);

  const displaySpinner = isLoading && offset === 0;

  const fetchData = () => {
    const queryApi = async () => {
      setIsLoading(true);
      const limit = !offset ? 20 : 10; // requests 20 gifs initially, adds 10 at a time thereafter
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${queryString}&limit=${limit}&offset=${offset}`);
      const { data, meta } = await response.json();
      console.log('data: ', data);
      setIsLoading(false);
      const statusNotOk = meta.status < 200 || meta.status > 299;
      if (!statusNotOk && data.length) {
        setGifs(gifs.concat(data))
        setOffset(offset + limit);
      } else {
        // handle errors:
        setFailedToLoad(true);
        const error = statusNotOk ? meta.msg : 'No valid results';
        throw new Error(error);
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
      <TopBar queryString={queryString} setQueryString={setQueryString} setGifs={setGifs} setOffset={setOffset} setFailedToLoad={setFailedToLoad} />
      <GifContent fetchData={fetchData} gifs={gifs} queryString={queryString} failedToLoad={failedToLoad} displaySpinner={displaySpinner} />
    </React.Fragment>
  );
}


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

  // const submitHandler = e => {
  //   e.preventDefault();
  //   if (typedString !== queryString) {
  //     setOffset(0);
  //     setGifs([]);
  //     setFailedToLoad(false);
  //     setQueryString(typedString);
  //     setTypedString("");
  //   }
  // };

  // const runApiSearch = () => {
  //   // setApiReqIsRunning(true);
  //   const limit = 20;
  //   fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
  //     .then(res => res.json())
  //     .then(jsonRes => {
  //       // Check in meta data whether response is OK:
  //       if (jsonRes.meta.status < 200 || jsonRes.meta.status > 299) {
  //         throw new Error(jsonRes.meta.msg);
  //       } else {
  //         console.log('jsonRes.data: ', jsonRes.data);
  //         const gifsToSet = offset === 0 ? jsonRes.data : trendingGifs.concat(jsonRes.data);
  //         // console.log('gifsToSet: ', gifsToSet);
  //         setGifs(gifsToSet);
  //         setOffset(offset + limit);
  //         // setApiReqIsRunning(false);
  //       }
  //     })
  //     .catch(err => console.log("Error:", err))
  // };

  // const queryApi = () => {
  //   const limit = 20;
  //   // This condition prevents this API request being made on the intitial mount:
  //   if (queryString !== "") {
  //     setIsLoading(true);
  //     fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${queryString}&limit=${limit}&offset=${offset}`)
  //       .then(res => res.json())
  //       .then(jsonRes => {
  //         // Check in meta data whether response is OK:
  //         if (jsonRes.meta.status < 200 || jsonRes.meta.status > 299) {
  //           throw new Error(jsonRes.meta.msg);
  //         } else if (jsonRes.data.length === 0) {
  //           throw new Error('No valid results');
  //         } else {
  //           setOffset(offset + limit);
  //           setGifs(gifs.concat(jsonRes.data))
  //         }
  //       })
  //       .catch(err => {
  //         setIsLoading(false);
  //         setFailedToLoad(true);
  //         console.log("Error:", err)
  //       })
  //   }
  // };


  const queryApi = () => {
    const fetchData = async () => {
      setIsLoading(true);
      const limit = 20;
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${queryString}&limit=${limit}&offset=${offset}`);
      const { data, meta } = await response.json();
      const statusNotOk = meta.status < 200 || meta.status > 299;
      setIsLoading(false);
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
      fetchData();
    }
  };

  // const queryApi = async () => {
  //   if (queryString) {
  //     setIsLoading(true);
  //     const limit = 20;
  //     const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${queryString}&limit=${limit}&offset=${offset}`);
  //     const { data, meta } = await response.json();
  //     console.log('data: ', data);
  //     const statusNotOk = meta.status < 200 || meta.status > 299;
  //     setIsLoading(false);
  //     if (!statusNotOk && data.length) {
  //       setGifs(gifs.concat(data))
  //       setOffset(offset + limit);
  //     } else {
  //       // handle errors:
  //       setFailedToLoad(true);
  //       const error = statusNotOk ? meta.msg : 'No valid results';
  //       throw new Error(error);
  //     }
  //   }
  // };

  // const resIsOk = data.meta.status >= 200 && data.meta.status <= 299;
  // if (!resIsOk) {
  //   setIsLoading(false);
  //   setFailedToLoad(true);
  //   throw new Error(data.meta.msg);
  // } else if (data.length === 0) {
  //   setIsLoading(false);
  //   throw new Error('No valid results');
  // } else {
  //   setOffset(offset + limit);
  //   setGifs(searchResultGifs.concat(jsonRes.data))
  // }
  // };

  // const handleSumbit = e => {
  //   e.preventDefault();
  //   if (typedString && typedString !== queryString) {
  //     setOffset(0);
  //     setGifs([]);
  //     setFailedToLoad(false);
  //     setQueryString(typedString);
  //     setTypedString("");
  //     queryApi();
  //   }
  // };

  const handleLoading = () => {
    if (isLoading && gifs.length) {
      setIsLoading(false);
    }
  };

  useEffect(queryApi, [queryString]);
  useEffect(handleLoading, [isLoading, gifs.length]);
  useEffect(() => console.log('gifs: ', gifs), [gifs]);


  return (
    <React.Fragment>
      {/* <UserSearchGifs /> */}
      {/* <TrendingGifs /> */}
      <TopBar queryApi={queryApi} queryString={queryString} setQueryString={setQueryString} setGifs={setGifs} setOffset={setOffset} setFailedToLoad={setFailedToLoad} />
      <GifContent queryApi={queryApi} gifs={gifs} failedToLoad={failedToLoad} displaySpinner={displaySpinner} />
    </React.Fragment>
  );
}


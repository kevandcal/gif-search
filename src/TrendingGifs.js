import React, { useState, useEffect } from 'react';
import MapGifs from './MapGifs';
import { API_KEY } from './secrets.json';

export default function TrendingGifs(mapGifs) {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [offset, setOffset] = useState(0);

  const runApiSearch = () => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=15&offset=${offset}`)
      .then(res => res.json())
      .then(jsonRes => {
        // Check in meta data whether response is OK:
        if (jsonRes.meta.status < 200 || jsonRes.meta.status > 299) {
          throw new Error(jsonRes.meta.msg);
        } else {
          if (offset === 0) {
            setTrendingGifs(jsonRes.data);
          } else {
            setTrendingGifs(trendingGifs.concat(jsonRes.data));
          }
          setOffset(offset + 15);
        }
      })
      .catch(err => console.log("Error:", err))
  };

  useEffect(() => {
    runApiSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {trendingGifs.length > 0 && (
        <h2>Trending GIFs</h2>
      )}
      <MapGifs arr={trendingGifs} runApiSearch={runApiSearch} />
    </React.Fragment>
  )
}

import React, { useState, useEffect } from 'react';
import RowOfGifs from './RowOfGifs';
import { API_KEY } from './secrets.json';

export default function TrendingGifs() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [offset, setOffset] = useState(0);

  const runApiSearch = () => {
    const limit = 15;
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(jsonRes => {
        // Check in meta data whether response is OK:
        if (jsonRes.meta.status < 200 || jsonRes.meta.status > 299) {
          throw new Error(jsonRes.meta.msg);
        } else {
          const gifsToSet = offset === 0 ? jsonRes.data : trendingGifs.concat(jsonRes.data);
          setTrendingGifs(gifsToSet);
          setOffset(offset + limit);
        }
      })
      .catch(err => console.log("Error:", err))
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(runApiSearch, []);

  return (
    <React.Fragment>
      {trendingGifs.length > 0 && (
        <h2>Trending GIFs</h2>
      )}
      <RowOfGifs gifs={trendingGifs} runApiSearch={runApiSearch} />
    </React.Fragment>
  )
}

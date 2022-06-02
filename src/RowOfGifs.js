import React from 'react';
import MoreButton from './MoreButton';

const RowOfGifs = ({ gifs, runApiSearch }) => (
  <div className="gifs-container">
    {gifs.map(gif => (
      <a
        key={gif.id}
        target="_blank"
        href={gif.embed_url}
        rel="noopener noreferrer"
      >
        <img
          alt={gif.title}
          className="gifs"
          src={gif.images.fixed_height_downsampled.url}>
        </img>
      </a>
    ))}
    {gifs.length > 0 && <MoreButton runApiSearch={runApiSearch} />}
  </div>
);

export default RowOfGifs;

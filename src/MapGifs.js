import React from 'react';
import MoreButton from './MoreButton';

const MapGifs = (props) => (
  <div className="gifs-container">
    {props.arr.map(gif => (
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
    {props.arr.length > 0 && <MoreButton runApiSearch={props.runApiSearch} />}
  </div>
);

export default MapGifs;

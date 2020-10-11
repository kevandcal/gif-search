import React from 'react';
import MoreButton from './MoreButton';

const mapGifs = (props) => (
  <div className="gifs-container">
    {props.arr.map(gif => (
      <img
        alt={gif.title}
        key={gif.id}
        className="gifs"
        src={gif.images.fixed_height_downsampled.url}>
      </img>
    ))}
    {props.arr.length > 0 && <MoreButton runApiSearch={props.runApiSearch} />}
  </div>
);

export default mapGifs;

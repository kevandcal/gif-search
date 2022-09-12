import React from 'react';

export function Gif({ gifObject, isHighResolution }) {
  const { images } = gifObject;
  const src = isHighResolution ? images.fixed_height.url : images.fixed_height_downsampled.url;

  const handleClick = () => window.open(gifObject.embed_url, '_blank');

  return (
    <img
      alt={gifObject.title}
      className="gif"
      src={src}
      onClick={handleClick}
    />
  );
}
import React from 'react';

export function Gif({ gifObject }) {
  const handleClick = () => window.open(gifObject.embed_url, '_blank')

  return (
    <img
      alt={gifObject.title}
      className="gif"
      src={gifObject.images.fixed_height_downsampled.url}
      onClick={handleClick}
    />
  );
}
import React from 'react';

export function Gif({ gifObject }) {
  const imageObject = gifObject.images.fixed_height;
  // const isSquare = imageObject.width * 1.5 === 300;
  // const isSquare = imageObject.width === imageObject.height;
  // const maxWidth = 300;
  // const marginRight = maxWidth - imageObject.width;

  const openLink = () => window.open(gifObject.embed_url, '_blank')

  // return !isSquare ? null : (
  return (
    <img
      alt={gifObject.title}
      className="gif"
      // style={{ width: gifWidth }}
      // src={gif.images.fixed_width_downsampled.url}
      // style={{ marginRight }}
      src={imageObject.url}
      onClick={openLink}
    />
  );
}
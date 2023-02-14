import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Gif } from '../gif/Gif';

export function GifsGrid({ gifs, gifsContainerRef }) {
  const { width } = useWindowSize();
  const [gifGridWidth, setGifGridWidth] = useState(0);

  const gifGridStyle = { width: !gifGridWidth ? 0 : gifGridWidth };

  const calculateGridWidth = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    // for narrow (phone) screens, reduce gif width to 90vw:
    const gifWidth = availableWidth < 395 ? availableWidth : 395;
    const columnsThatFit = Math.floor((availableWidth + columnGap) / (gifWidth + columnGap));
    const columnAmount = columnsThatFit > 3 ? 3 : columnsThatFit;
    const gridWidth = (columnAmount * gifWidth) + ((columnAmount - 1) * columnGap);
    setGifGridWidth(gridWidth);
  };

  useEffect(calculateGridWidth, [width]);

  return (
    <div id='gifs-grid' style={gifGridStyle}>
      {gifs.map((gif, index) => (
        <Gif
          key={index}
          gifObject={gif}
          gifsContainerRef={gifsContainerRef}
        />
      ))}
    </div>
  );
}
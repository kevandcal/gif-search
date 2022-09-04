import React, { useEffect, useRef, useState } from 'react';
import RightButton from './RightButton';
import LeftButton from './LeftButton';
import { useWindowSize } from '../helper/window-size';

const RowOfGifs = ({ gifs, runApiSearch }) => {
  const gifsContainerRef = useRef(null);
  const { width, height } = useWindowSize();
  // const [gifWidths, setGifWidths] = useState([]);
  // const [gifsContainerHeight, setGifsContainerHeight] = useState(null);
  const [gifsStyles, setGifsStyles] = useState({ width: 0, columnCount: 0, WebkitColumnCount: 0, MozColumnCount: 0 });

  // const updateScrollX = () => setScrollX(gifsContainerRef.current.scrollLeft);

  const calculateGifsColumns = () => {
    // const gifsContainerWidth = gifsContainerRef.current.style.width;
    const availableWidth = width * 0.9;
    const rowGap = 5;
    const gifWidth = 200;
    const totalGifWidth = rowGap + gifWidth;
    const columnAmount = Math.floor((availableWidth + rowGap) / totalGifWidth);
    const gifsWidth = (columnAmount * totalGifWidth) - rowGap;
    if (columnAmount && gifsWidth) {
      setGifsStyles({ width: gifsWidth, columnCount: columnAmount, WebkitColumnCount: columnAmount, MozColumnCount: columnAmount });
    }
  };

  const infiniteScroll = () => {
    // setGifsHeight(gifsContainerRef.current.clientHeight)
    // const gifsContainerHeight = gifsContainerRef.current.getBoundingClientRect().height;
    // if (gifs.length % 20 === 0) {
    //   const gifsContainerHeight = gifsContainerRef.current?.clientHeight;
    //   console.log('gifsContainerHeight: ', gifsContainerHeight);
    // };

    if (gifsContainerRef.current?.scrollTop + gifsContainerRef.current?.clientHeight >= gifsContainerRef.current?.scrollHeight) {
      runApiSearch();
    }
  };

  useEffect(calculateGifsColumns, [width]);
  // useEffect(infiniteScroll, [gifs.length, gifsContainerRef]);


  return (
    <div className='gifs-container' ref={gifsContainerRef} onScroll={infiniteScroll}>
      <div
        className="gifs"
        style={gifsStyles}
      >
        {gifs.map((gif, index) => (
          <img
            key={index}
            alt={gif.title}
            className="gif"
            src={gif.images.fixed_width_downsampled.url}
            onClick={() => window.open(gif.embed_url, '_blank')}
          />
        ))}
      </div>
    </div >
  );
}

export default RowOfGifs;

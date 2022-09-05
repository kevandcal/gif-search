import React, { useEffect, useRef, useState } from 'react';
import RightButton from './RightButton';
import LeftButton from './LeftButton';
import { useWindowSize } from '../helper/window-size';

const RowOfGifs = ({ gifs, runApiSearch }) => {
  const gifsContainerRef = useRef(null);
  const { width, height } = useWindowSize();
  // const [gifWidths, setGifWidths] = useState([]);
  // const [gifsContainerHeight, setGifsContainerHeight] = useState(null);
  // const [gifWidth, setGifWidth] = useState(0);
  const [gifsStyles, setGifsStyles] = useState({ width: 0, columnCount: 0, WebkitColumnCount: 0, MozColumnCount: 0 });


  // const updateScrollX = () => setScrollX(gifsContainerRef.current.scrollLeft);

  const calculateGifsColumns = () => {
    const availableWidth = width * 0.9;
    const columnGap = 5;
    const gifWidth = 295;
    const totalGifWidth = columnGap + gifWidth;
    let columnAmount = Math.floor((availableWidth + columnGap) / totalGifWidth);
    if (columnAmount > 4) {
      columnAmount = 4;
    }
    const gifsWidth = (columnAmount * totalGifWidth) - columnGap;
    if (columnAmount && gifsWidth) {
      setGifsStyles({ width: gifsWidth, columnCount: columnAmount, WebkitColumnCount: columnAmount, MozColumnCount: columnAmount });
    }
  };

  // const calculateGifWidth = () => {
  //   let availableWidth = width * 0.9;
  //   if (availableWidth > 1200) {
  //     availableWidth = 1200;
  //   }
  //   const columns = 3;
  //   const columnGap = 5;
  //   const columnGapsTotal = (columnGap - 1) * columns;
  //   const individualgifWidth = (availableWidth - columnGapsTotal) / columns;
  //   setGifWidth(individualgifWidth);
  // };

  const infiniteScroll = () => {
    const refEl = gifsContainerRef.current;
    if (refEl?.scrollTop + refEl?.clientHeight >= refEl?.scrollHeight - 20) {
      runApiSearch();
    }
    // console.log('refEl?.scrollTop: ', refEl?.scrollTop);
    // console.log('refEl?.clientHeight: ', refEl?.clientHeight);
    // console.log('refEl?.scrollHeight: ', refEl?.scrollHeight);
  };

  useEffect(calculateGifsColumns, [width]);
  // useEffect(calculateGifWidth, [width]);
  useEffect(infiniteScroll, [window.scrollY]);



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
            // style={{ width: gifWidth }}
            // src={gif.images.fixed_width_downsampled.url}
            src={gif.images.fixed_width.url}
            onClick={() => window.open(gif.embed_url, '_blank')}
          />
        ))}
      </div>
    </div >
  );
}

export default RowOfGifs;

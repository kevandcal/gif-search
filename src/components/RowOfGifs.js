import React, { useEffect, useRef, useState } from 'react';
import RightButton from './RightButton';
import LeftButton from './LeftButton';
import { useWindowSize } from '../helper/window-size';

const RowOfGifs = ({ gifs, runApiSearch }) => {
  const gifsContainerRef = useRef(null);
  const { width } = useWindowSize();
  const [gifWidths, setGifWidths] = useState([]);
  const [cumulativeGifsWidth, setCumulativeGifsWidth] = useState(0);
  // const [howManyGifsFit, setHowManyGifsFit] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [gifsLeftOfBtn, setGifsLeftOfBtn] = useState(0);

  const visibleContentWidth = (width * 0.9) - 50 - 60; // width * 0.9 = page width - margin (10vw), 50 = width of right btn

  const updateScrollX = () => setScrollX(gifsContainerRef.current.scrollLeft);

  const calculateGifsLeftOfBtn = () => {
    // gifsLeftOfBtn === 0 ensures this only runs on mount:
    if (gifWidths.length && visibleContentWidth && gifsLeftOfBtn === 0) {
      let i = 0;
      let sum = 0;
      const space = visibleContentWidth + scrollX;
      while (sum <= space) {
        // sum += gifWidths[i] + 10;
        sum += i === 0 ? gifWidths[i] : gifWidths[i] + 10;
        i++;
      }
      const result = i - 1;
      setGifsLeftOfBtn(result);
    }
  };

  // const getGifsLeftOfBtnOnPageLoad = () => {
  //   if (gifsLeftOfBtn === 0) {
  //     calculateGifsLeftOfBtn();
  //   }
  // };

  // const getGifsLeftOfBtnOnWindowResize = () => {
  //   const handleResize = () => {
  //     calculateGifsLeftOfBtn();
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // };

  // const fetchMoreGifs = () => {
  //   if (!apiReqIsRunning) {
  //     const buffer = 600;
  //     const fewGifsRemaining = scrollX + visibleContentWidth >= cumulativeGifsWidth - buffer;
  //     if (fewGifsRemaining) {
  //       runApiSearch();
  //       console.log('api search run');
  //     }
  //   }
  // };

  const scrollRight = () => {
    // let totalSpaceLeftOfBtn = 0;
    // for (let i = 0; i <= gifsLeftOfBtn; i++) {
    //   totalSpaceLeftOfBtn += gifWidths[i] + 10;
    // }
    // const scrollAmount = totalSpaceLeftOfBtn - visibleContentWidth;
    // gifsContainerRef.current.scrollLeft = scrollAmount;
    // setGifsLeftOfBtn(prev => prev + 1);

    // // if near end of gifs array, fetch more:
    // const buffer = 400;
    // if (scrollX + visibleContentWidth >= cumulativeGifsWidth - buffer) {
    runApiSearch();
    // }
  };


  const scrollLeft = () => {
    // const scrollAmount = scrollX + 60;

    // let totalOffsetSpace = 0;
    // for (let i = 0; i <= gifsLeftOfBtn; i++) {
    //   totalSpaceLeftOfBtn += gifWidths[i] + 10;
    // }
    // gifsContainerRef.current.scrollLeft = scrollAmount;
    // gifsContainerRef.current.scrollLeft = 100;
    // calculateGifsLeftOfBtn();
  };

  const extractGifWidths = () => {
    if (gifs.length) {
      // const arrayOfWidths = gifs.map(gif => Number(gif.images.fixed_height_downsampled.width));
      // setGifWidths(arrayOfWidths);

      const arrayOfWidths = [];
      let cumulativeWidth = 0;
      gifs.forEach(gif => {
        const gifWidth = Number(gif.images.fixed_height_downsampled.width);
        arrayOfWidths.push(gifWidth);
        cumulativeWidth += gifWidth + 10;
      });
      setGifWidths(arrayOfWidths);
      setCumulativeGifsWidth(cumulativeWidth);
    }
  };

  // const calculateHowManyGifsFit = () => {
  //   if (gifWidths.length && visibleContentWidth) {
  //     let i = 0;
  //     let sum = 0;
  //     while (sum <= visibleContentWidth) {
  //       // sum += i === 0 ? Number(gifWidths[i]) : Number(gifWidths[i]) + 10;
  //       sum += Number(gifWidths[i]) + 10;
  //       i++;
  //     }
  //     setHowManyGifsFit(i - 1);
  //   }
  // };

  useEffect(calculateGifsLeftOfBtn, [scrollX, visibleContentWidth, gifWidths]);
  useEffect(extractGifWidths, [gifs]);
  // useEffect(calculateHowManyGifsFit, [gifWidths, visibleContentWidth]);
  // useEffect(fetchMoreGifs, [cumulativeGifsWidth, scrollX, visibleContentWidth]);

  // useEffect(() => console.log('gifWidths: ', gifWidths), [gifWidths]);
  // useEffect(() => console.log('howManyGifsFit: ', howManyGifsFit), [howManyGifsFit]);
  // useEffect(() => console.log('scrollX: ', scrollX), [scrollX]);
  useEffect(() => console.log('gifsLeftOfBtn: ', gifsLeftOfBtn), [gifsLeftOfBtn]);
  // useEffect(() => console.log('cumulativeGifsWidth: ', cumulativeGifsWidth), [cumulativeGifsWidth]);


  return (
    <div className='row-of-gifs'>
      {/* {scrollX > 50 ? <LeftButton clickHandler={scrollLeft} scrollX={scrollX} /> : null} */}
      {/* <LeftButton scrollX={scrollX} /> */}
      {/* {!gifs.length ? null : <RightButton clickHandler={scrollRight} />} */}
      <div className="gifs-container" ref={gifsContainerRef} onScroll={updateScrollX} style={{}}>
        {gifs.map((gif, index) => (
          // <a
          //   // key={gif.id}
          //   className="gifs"
          //   key={index}
          //   target="_blank"
          //   href={gif.embed_url}
          //   rel="noopener noreferrer"
          // >
          <img
            alt={gif.title}
            className="gifs"
            // src={gif.images.fixed_height_downsampled.url}
            src={gif.images.fixed_width_downsampled.url}
            onClick={() => window.open(gif.embed_url, '_blank')}
          />
          // </a>
        ))}
        {/* {gifs.length > 0 && <RightButton clickHandler={runApiSearch} />} */}
      </div>
    </div >
  );
}

export default RowOfGifs;

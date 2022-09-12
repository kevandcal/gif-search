import React, { useEffect, useState } from 'react';

export function TopBar({ queryString, setQueryString, setGifs, setOffset, setFailedToLoad, topBarIsStyled, setTopBarIsStyled, isHighResolution, setIsHighResolution }) {
  const [typedString, setTypedString] = useState("");
  // const [title, setTitle] = useState('');

  const resBtnText = `${isHighResolution ? 'Decrease ' : 'Increase'} resolution`;

  const changeResolution = e => { e.preventDefault(); setIsHighResolution(prev => !prev) };

  const handleInputChange = e => setTypedString(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setTopBarIsStyled(false);
    if (typedString && typedString !== queryString) {
      setOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(typedString);
      setTypedString("");
    }
  };

  useEffect(() => console.log('topBarIsStyled: ', topBarIsStyled), [topBarIsStyled]);

  return (
    <div id='top-bar' className={topBarIsStyled ? 'darker' : null}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What type of GIFs would you like to see?"
          value={typedString}
          onChange={handleInputChange}
        />
        <button>Search</button>
      </form>
      <button onClick={changeResolution}>{resBtnText}</button>
      {/* <p>{queryString}</p> */}
    </div>
  );
}
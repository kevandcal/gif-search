import React, { useEffect, useRef, useState } from 'react';

export function TopBar({ queryString, setQueryString, setGifs, setOffset, setFailedToLoad, topBarIsStyled, setTopBarIsStyled, isHighResolution, setIsHighResolution }) {
  const topBarRef = useRef(null);
  const [typedString, setTypedString] = useState("");
  const [darkModeIsActive, setDarkModeIsActive] = useState(false);

  const resBtnText = `${isHighResolution ? 'Decrease ' : 'Increase'} resolution`;

  const handleResBtn = e => { e.preventDefault(); setIsHighResolution(prev => !prev) };

  const darkModeBtnText = `Dark mode ${darkModeIsActive ? 'off ' : 'on'}`;

  const handleDarkModeBtn = e => { e.preventDefault(); setDarkModeIsActive(prev => !prev) };

  const toggleDarkMode = () => {
    if (darkModeIsActive) {
      document.body.classList.add('dark');
      topBarRef.current.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      topBarRef.current.classList.remove('dark');
    }
  };

  const handleTopBarScrollStyling = () => {
    if (topBarIsStyled) {
      topBarRef.current.classList.add('styled');
    } else {
      topBarRef.current.classList.remove('styled');
    }
  };

  const handleInputChange = e => setTypedString(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (typedString && typedString !== queryString) {
      setTopBarIsStyled(false);
      setOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(typedString);
      setTypedString("");
    }
  };

  // useEffect(() => console.log('topBarIsStyled: ', topBarIsStyled), [topBarIsStyled]);
  useEffect(toggleDarkMode, [darkModeIsActive]);
  useEffect(handleTopBarScrollStyling, [topBarIsStyled]);

  return (
    <div id='top-bar' ref={topBarRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What type of GIFs would you like to see?"
          value={typedString}
          onChange={handleInputChange}
        />
        <button>Search</button>
      </form>
      <button onClick={handleResBtn}>{resBtnText}</button>
      <button onClick={handleDarkModeBtn}>{darkModeBtnText}</button>
      {/* <p>{queryString}</p> */}
    </div>
  );
}
import React, { useState } from 'react';

export function TopBar({ queryString, setQueryString, setGifs, setOffset, setFailedToLoad }) {
  const [typedString, setTypedString] = useState("");
  // const [title, setTitle] = useState('');

  const handleInputChange = e => setTypedString(e.target.value);


  const handleSubmit = e => {
    e.preventDefault();
    if (typedString && typedString !== queryString) {
      setOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(typedString);
      setTypedString("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What type of GIFs would you like to see?"
          value={typedString}
          onChange={handleInputChange}
        />
        <button>Search</button>
      </form>
      {/* <p>{queryString}</p> */}
    </>
  );
}
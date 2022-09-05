import React, { useEffect, useState } from 'react';

export function TopBar({ queryApi, queryString, setQueryString, setGifs, setOffset, setFailedToLoad }) {
  const [typedString, setTypedString] = useState("");
  // const [queryString, setQueryString] = useState('');
  // const [title, setTitle] = useState('');

  const handleInputChange = e => setTypedString(e.target.value);


  const handleSubmit = e => {
    e.preventDefault();
    if (typedString && typedString != queryString) {
      setOffset(0);
      setGifs([]);
      setFailedToLoad(false);
      setQueryString(typedString);
      // setTitle(typedString);
      setTypedString("");
    }
  };

  // useEffect(() => console.log('queryString: ', queryString), [queryString]);
  // useEffect(queryApi, [queryString]);

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
      <p>{queryString}</p>
    </>
  );
}
# GIF Search

This is an app built in React that allows users to search the Giphy database.

## Demo

<!-- ![GIF Search](src/images/gif-search.gif) -->
<!-- ![GIF Search](src/images/gif-search-demo-950px.mp4) -->

<video width="100%" height="auto">
  <source src="src/images/gif-search-demo-950px.mp4" type="video/mp4">
</video>

[try for yourself](https://kevandcal.github.io/gif-search/)

## Built with

React, CSS3, local storage, Font Awesome icons, Giphy API

## Features

* When the app loads, the top 30 trending GIFs on Giphy are displayed
* The user can search for specific types of gifs by entering a search query
* The user's search query remains in the input field as a header (like YouTube)
* The input field can be cleared by clicking the X icon that appears whenever it is not empty
* Trending gifs can be navigated back to by clicking the house icon to the left of the input bar
* Gifs are arranged in a 3-column grid if space allows; if not, they are arranged in 1 or 2 columns
* The app is fully responsive and should work on any screen size
* To the right of the input field is an ellipsis icon; clicking it opens a dialog of settings
* Users can toggle between the following settings:
    * Lazy loading or immediate loading
    * High or low resolution
    * Playing each gif either only on hover or whenever it is at least partially on screen
    * Infinite scroll or pagination (pagination makes use of custom-built animated buttons)
    * Light or dark mode
* Settings persist in each user's browser by using local storage
* For better performance, off-screen gifs do not play on all settings
* Empty search queries do not trigger an API call
* A spinner appears while search queries are loading
* An error message is rendered if the search query is unsuccessful

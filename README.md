# GIF Search

This is a small app built in React that allows users to search the Giphy database and also displays its top currently trending GIFs.

## Demo (click to try for yourself)

[![GIF Search](public/gif-search.gif)](https://kevandcal.github.io/gif-search/)

## Built with

React (Hooks), CSS, Giphy API

## Features

-   GIFs are horizontally scrollable
-   When the app loads, the top 15 trending GIFs on Giphy are displayed 
-   When the user enters a search query and clicks `Search`, the 15 most relevant GIFs appear on screen
-   The user's search query forms part of the header above the resultant GIFs
-   Empty search queries do not trigger an API call
-   The search query is automatically removed from the search bar upon submission
-   A spinner appears while search queries are loading
-   An error message is rendered if the search query is unsuccessful
-   The button to the right of the last GIF, when clicked, triggers a new API request and appends 15 more GIFs to those already displayed

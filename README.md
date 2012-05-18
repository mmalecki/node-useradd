# useradd [![Build Status](https://secure.travis-ci.org/mmalecki/node-useradd.png)](http://travis-ci.org/mmalecki/node-useradd)
`useradd` is a wrapper of `useradd` command line tool for adding users. It has a nice, sweet API.

## Installation

    npm install useradd

## Usage
```js
var useradd = require('useradd');
useradd('maciej'); // spawns `useradd maciej`
```

See tests for more advanced usage.

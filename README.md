# map-expire

Extended Map object with capasity and expire features

## install

```sh
npm install --save map-expire
```

## usage

```javascript

var cache = require('map-expire');

cache.set(key, value, duration)

var value = cache.get(key)

```

## API

- set(key, value, duration)
	if duration (second) is falsy or not given means this item never expired.

- get(key)
	return undefined if not exists or expired
	
- capasity (property, integer)

## test

```sh
npm test
```
	
# map-expire

Extended Map object with capacity and expire features

## install


```sh
npm install --save map-expire
```

## usage

```javascript

const Cache = require('map-expire');
const cache = new Cache()

cache.set(key, value, duration)

const value = cache.get(key)

```

## API

- set(key, value, duration)
	if duration (millisecond) is falsy or not given this item will never be expired.

- get(key)
	return undefined if not exists or expired

## test

```sh
npm test
```

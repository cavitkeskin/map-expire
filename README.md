# map-expire

Extended Map object with capacity and expire features

## install


```sh
npm install --save map-expire
```

## usage

```javascript

const cache = require('map-expire');

cache.set(key, value, duration)

const value = cache.get(key)
cache.delete(key)
```

or

```js
const MapExpire = require('map-expire/MapExpire');
const options = {
	capacity: 100, 
	duration: 1000 // in millisecond, default expiration time
}
const cache = new MapExpire([], options)

cache.set(key, value, duration)
const value = cache.get(key)
cache.delete(key)
```

## API

- set(key, value, duration)

	duration will be set to default value if not given.

- get(key)
	returns with undefined if not exists or expired

## test

```sh
npm test
```

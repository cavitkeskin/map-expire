'use strict';

var Cache = require('./index'),
	assert = require('assert');

describe('Extended Map Object', function(){
	it('add/update item', function(done){
		const cache = new Cache([], 20)	
		cache.set(5, 5)
		assert.strict.equal(cache.get(5), 5);
		cache.set(5, 'five');
		assert.strict.equal(cache.get(5), 'five');
		done()
	})

	it('capacity test', function(done){
		const cache = new Cache([], 20)	
		for(var i = 0; i<200; i++){
			cache.set(`key_${i}`, `value_${i}`);
		}
		assert.equal(cache.size, cache.capacity, `it should be ${cache.capacity}`)
		done()
	})
	it('should all data expired', done => {
		const cache = new Cache([], 20)	
		for(var i = 0; i<200; i++){
			cache.set(`key_${i}`, `value_${i}`, 200);
		}
		const test = t => {
			return new Promise ((resolve, reject) => {
				setTimeout(() => resolve(cache.size), t)
			})
		}
		const jobs = [1, 2, 3, 4].map(t => test(t*100))
		Promise.all(jobs).then(ts => {
			assert.ok(ts.includes(0))
			done()
		}).catch(err => done(err))
	})
})

describe('Event Test', function(){
	
	it('save event', done => {
		const cache = new Cache()	
		cache.on('save', (key, value)=>{
			assert.strict.equal(key, '3a')
			assert.strict.equal(value, 'AAA')
			done()
		})
		cache.set('3a', 'AAA')
	})

	it('expire event', done => {
		const cache = new Cache()	
		cache.on('delete', (key, value)=>{
			assert.strict.equal(key, 'exp')
			assert.strict.equal(value, 'EXPIRED')
			done()
		})
		cache.set('exp', 'EXPIRED', 100)
	})

})

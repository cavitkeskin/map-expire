'use strict';

var cache = require('./index'),
	assert = require('assert');

describe('Extended Map Object', function(){
	before('initialize', function(done){
		for(var i = 0; i < 10; i++){
			cache.set(i, i*100, i*50 + 100)
		}
		done()
	})
	
	it('update item', function(done){
		cache.set(5, 'five');
		assert.equal(cache.get(5), 'five', 'it should be "five"');
		done()
	})
	
	it('expire test', function(done){
		setTimeout(function(){
			assert.equal(cache.get(1), undefined, 'it should be undefined')
			assert.equal(cache.get(9), 900, 'it should be 9')
			done()
		}, 200)
	})
	
	it('capasity test', function(done){
		cache.capasity = 20;
		for(var i = 0; i<200; i++){
			cache.set(`key_${i}`, `value_${i}`);
		}
		assert.equal(cache.size, cache.capasity, `it should be ${cache.capasity}`)
		done()
	})
})


'use strict'

const cache = require('./index')
const MapExpire = require('./MapExpire')
const assert = require('assert')

describe('Map Expire', function(){
  describe('Method Test', ()=>{
    it('should pass set/delete methods', done => {
      const map = new MapExpire()
      map.set('key', 5)
      assert.strictEqual(map.get('key'), 5)
      map.set('key', 'FIVE')
      assert.strictEqual(map.get('key'), 'FIVE')
      map.set('key', null)
      assert.strictEqual(map.get('key'), null)
      map.delete('key')
      assert.strictEqual(map.get('key'), undefined)
      done()
    })
  })

  describe('Event Test', ()=>{
    it('should fire set event', done => {
      const map = new MapExpire()
      map.on('set', key => {
        assert.strictEqual(key, 'key')
        done()
      })
      map.set('key', 'value')
    })
    it('should fire update event', done => {
      const map = new MapExpire()
      map.on('update', (key, value) => {
        assert.strictEqual(key, 'key')
        assert.strictEqual(value, 'value-updated')
        done()
      })
      map.set('key', 'value')
      map.set('key', 'value-updated')
    })
    it('should fire delete event', done => {
      const map = new MapExpire()
      map.on('delete', key => {
        assert.strictEqual(key, 'key')
        done()
      })
      map.set('key', 'value')
      map.delete('key')
    })
    it('should fire delete event when expired', done => {
      const map = new MapExpire()
      map.on('delete', (key, value) => {
        assert.strictEqual(key, 'key')
        assert.strictEqual(value, 'value-updated')
        done()
      })
      map.set('key', 'value', 10000)
      map.set('key', 'value-updated', 10)
    })
    it('should delete all key-value pairs', done => {
      const keys = [
        'one', 
        'two',
        'three',
      ]
      const deleted = []
      const map = new MapExpire(keys.map((key, n)=>[key, n]))
      map.on('delete', key => deleted.push(key))
      map.clear()
      assert.deepStrictEqual(keys, deleted)
      done()
    })
  })
	
  describe('Capasity Test', function(){
    it('should delete overflowed items', done=>{
      const test = 10
      cache.capacity = 3
      for (let n = 0; n < test; n++) cache.set(n, n * n)
      assert.strictEqual(cache.size, cache.capacity)
      for (let n = test - cache.capacity; n < test; n++)
        assert.strictEqual(cache.get(n), n * n)
      done()
    })
  })
})

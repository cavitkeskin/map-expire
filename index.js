'use strict';

const EventEmitter = require('events');

class Entity {
	constructor(data, duration){
		this.data = data
		this.expire = duration ? Date.now() + duration : false
	}

	get expired(){
		return this.expire ? this.expire <= Date.now() : false
	}
}

class Cache extends Map {
	constructor(values, capacity = 100){
		super(values)
		this.events = new EventEmitter()
		this.capacity = capacity
	}
	set(key, value, duration){
		var entity = new Entity(value, duration)
		super.set(key, entity)
		this.events.emit('save', key, value, duration)
		if(this.size > this.capacity) this.clean()
		if(duration) setTimeout(key => {
			const o = super.get(key)
			if(o && !o.expired) console.log(`${key} is not expired!`, Date.now() - o.expire)
			if(o && o.expired) this.delete(key); 
		}, duration, key)
	}

	get(key){
		var entity = super.get(key);
		return entity === undefined || entity.expired ? undefined : entity.data;
	}

	delete(key){
		this.events.emit('delete', key, super.get(key).data)
		super.delete(key)
	}
	clean(){
		var keys = this.keys();
		while(this.size > this.capacity){
			var key = keys.next().value;
			this.delete(key)
		}
	}

	on(event, callback){
		this.events.on(event, callback);
	}
}

module.exports = Cache;

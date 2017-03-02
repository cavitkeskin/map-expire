'use strict';

class Entity {
	constructor(data, duration){
		this.data = data
		this.expire = duration ? (new Date()).getTime() + duration : false
	}
	
	get expired(){
		return this.expire ? this.expire < (new Date()).getTime() : false;
	}
}

class Cache extends Map {
	
	set(key, value, duration){
		var entity = new Entity(value, duration)
		super.set(key, entity)
		this.clean()
	}
	
	get(key){
		var entity = super.get(key);
		return entity === undefined || entity.expired ? undefined : entity.data;
	}

	clean(){
		this.capasity = this.capasity || 100;
		if(this.size < this.capasity) return;
		this.forEach(function(item, key){
			if(item.expired) this.delete(key)
		}, this)
		var keys = this.keys();
		while(this.size > this.capasity){
			var key = keys.next().value;
			this.delete(key)
		}
	}
	
}

module.exports = new Cache();


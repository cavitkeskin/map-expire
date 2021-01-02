const EventEmitter = require('events')

class Entity {
  constructor(key, value, duration, map){
    this.key = key
    this.value = value
    this.expire = duration && (Date.now() + duration)
    this.timer = duration && setTimeout(() => map.delete(key), duration)
  }

  update(value, duration, map){
    this.value = value
    if (duration) {
      if (this.timer) clearTimeout(this.timer)
      this.expire = duration && (Date.now() + duration)
      this.timer = setTimeout(() => map.delete(this.key), duration)
    }
  }
}

class MapExpire extends Map {
  constructor(values, options){
    super()
    this.events = new EventEmitter() 
    this.capacity = options?.capacity 
    this.duration = options?.duration 
    if (values) values.forEach(item => this.set(...item))
  }
    
  set(key, value, duration){
    const entity = super.get(key) 
    if (entity) {
      entity.update(value, duration, this) 
      this.events.emit('update', key, value)
    }
    else {
      super.set(key, new Entity(key, value, duration || this.duration, this))
      this.events.emit('set', key, value)
    }
    this.clean()
  }

  get(key){
    const entity = super.get(key)
    return entity?.value
  }

  delete(key){
    this.events.emit('delete', key, super.get(key).value)
    super.delete(key)
  }

  clear(){
    for (let key of this.keys()) {
      this.delete(key)
    }
    super.clear()
  }

  clean(){
    const {size, capacity} = this
    if (!capacity || size <= capacity) return
    var keys = this.keys()
    while (this.size > this.capacity){
      var key = keys.next().value
      this.delete(key)
    }
  }

  on(event, callback){
    this.events.on(event, callback)
  }
}

module.exports = MapExpire

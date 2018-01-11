import Deferred from '../Deferred.js'

class CachedLoader {
  constructor (cache, loader) {
    this.loader = loader
    this.cache = cache
  }

  load () {
    let cache = this.cache
    let cacheKey = JSON.stringify(arguments)
    if (cache[cacheKey] !== undefined) {
      let resolved = Deferred.createResolved(cache[cacheKey])
      resolved.progress(1)
      return resolved.promise
    }
    return this.loader.load.apply(this.loader, arguments).then((data) => {
      cache[cacheKey] = data
    })
  }

  isInCache () {
    let cacheKey = JSON.stringify(arguments)
    return this.cache[cacheKey] !== undefined
  }

  clear () {
    this.loader.clear()
  }

  stop () {
    this.loader.stop()
  }

  start () {
    this.loader.start()
  }
}

export default CachedLoader

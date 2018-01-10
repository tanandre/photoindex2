import Deferred from '../Deferred.js'

class ImageWorker {
  constructor () {
    this.img = new Image()
    this._isAvailable = true
  }

  isAvailable () {
    return this._isAvailable
  }

  execute (url) {
    if (!this._isAvailable) {
      throw new Error('should not be called when not available')
    }
    // console.log('ImageWorker start loading url', url);

    let deferred = new Deferred()
    this._isAvailable = false
    let _this = this
    this.img.onload = function () {
      _this._isAvailable = true
      // console.log('ImageWorker onload', url);
      deferred.resolve(url)
    }
    this.img.onerror = function () {
      _this._isAvailable = true
      deferred.reject(url)
    }
    this.img.src = url
    return deferred.promise
  }
}

export default ImageWorker

import Deferred from '../Deferred.js'

class XhrWorker {
  constructor (http) {
    this._http = http
    this._isAvailable = true
  }

  isAvailable () {
    return this._isAvailable
  }

  execute (url, params) {
    this._isAvailable = false
    let deferred = new Deferred()
    this._http.get(url, params).then(response => {
      this._isAvailable = true
      deferred.resolve(response)
    }).catch(err => {
      this._isAvailable = true
      deferred.reject(err)
    })
    return deferred.promise
  }
}

export default XhrWorker

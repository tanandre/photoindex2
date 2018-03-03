/**
 * TODO add promise api that returns a less exposed api
 */

class Deferred {
  static createResolved (data) {
    let deferred = new Deferred()
    deferred.resolve(data)
    return deferred
  }

  static createRejected (err) {
    let deferred = new Deferred()
    deferred.reject(err)
    return deferred
  }

  constructor () {
    this._isResolved = false
    this._isRejected = false
    this._isCanceled = false
    this._hasProgress = false
    this.listeners = []
    this.chainedPromises = []
    let _parent = this
    this.promise = {
      then: _parent.then.bind(_parent),
      cancel: _parent.cancel.bind(_parent),
      isDone: _parent.isDone.bind(_parent),
      isResolved: _parent.isResolved.bind(_parent),
      isRejected: _parent.isRejected.bind(_parent),
      isCanceled: _parent.isCanceled.bind(_parent),
      hasProgress: _parent.hasProgress.bind(_parent)
    }
  }

  setParent (p) {
    this._parentCancel = p
  }

  isResolved () {
    return this._isResolved
  }

  isRejected () {
    return this._isRejected
  }

  isCanceled () {
    return this._isCanceled
  }

  hasProgress () {
    return this._hasProgress
  }

  isDone () {
    return this._isResolved || this._isRejected || this._isCanceled
  }

  then (onOk, onError, onProgress) {
    let listener = [onOk, onError, onProgress]
    this.listeners.push(listener)

    let d = new Deferred()
    d.setParent(this)
    this.chainedPromises.push(d)
    if (this._isResolved) {
      this.data = this.signalListeners(this.data, 0)
      d.resolve(this.data)
    } else if (this._isRejected) {
      this.data = this.signalListeners(this.data, 1)
      d.reject(this.data)
    }
    return d
  }

  catch (onError) {
    let listener = [undefined, onError, undefined]
    this.listeners.push(listener)
    let d = new Deferred()
    d.setParent(this)
    this.chainedPromises.push(d)
    if (this._isRejected) {
      this.data = this.signalListeners(this.data, 1)
      d.reject(this.data)
    }
    return d
  }

  progress (data) {
    this._hasProgress = true
    this.signalListeners(data, 2)
    this.signalChain('progress', this.data)
  }

  resolve (data) {
    if (this._isResolved) {
      throw new Error('Cannot resolve, deferred already resolved')
    }
    if (this._isRejected) {
      throw new Error('Cannot resolve, Deferred already rejected')
    }
    this._isResolved = true
    this.data = data
    let dataChained = this.signalListeners(data, 0)
    this.data = dataChained
    this.signalChain('resolve', this.data)
  }

  reject (data) {
    if (this._isResolved) {
      console.error(data)
      throw new Error('Cannot reject, deferred already resolved')
    }
    if (this._isRejected) {
      console.error(data)
      throw new Error('Cannot reject, Deferred already rejected')
    }
    this._isRejected = true
    this.data = data
    this.data = this.signalListeners(data, 1)
    this.signalChain('reject', this.data)
  }

  cancel () {
    if (this._isCanceled) {
      return
    }
    this._isCanceled = true
    this.signalChain('cancel')
    if (this._parentCancel) {
      this._parentCancel.cancel()
    }
  }

  signalChain (fnc, arg) {
    let data = arg
    this.chainedPromises.forEach(d => {
      data = d[fnc](data)
    })
  }

  signalListeners (data, index) {
    if (this._isCanceled) {
      return data
    }

    let dataChained = data
    this.listeners.forEach((listener) => {
      let callback = listener[index]
      if (callback) {
        let responseData = callback(dataChained)
        if (responseData !== undefined) {
          dataChained = responseData
        }
      }
    })
    return dataChained
  }

  /**
   * wait for all promises to complete.
   * TODO add progress update for each deferred that is complete.
   * @param deferredList
   * @returns {Deferred}
   */
  static all (deferredList) {
    let globalDeferred = new Deferred()
    deferredList.forEach(deferred => {
      function onComplete (data) {
        deferred.__data = data

        let isAllComplete = deferredList.every(d => d._isResolved || d._isRejected)

        if (isAllComplete) {
          let isRejected = deferredList.some(d => d._isRejected)
          if (isRejected) {
            globalDeferred.reject(deferredList.map(d => d.__data))
          } else {
            globalDeferred.resolve(deferredList.map(d => d.__data))
          }
        }
      }

      deferred.then(onComplete, onComplete)
    })
    return globalDeferred
  }
}

export default Deferred

import Deferred from '../Deferred.js'

class QueuedLoader {
  constructor (workers, isFifo) {
    this.queue = []
    this.workers = workers
    this._stop = false
    this.isFifo = isFifo
  }

  load () {
    let deferred = new Deferred()
    this.queue.push({
      args: arguments,
      deferred: deferred
    })
    this.start()
    return deferred.promise
  }

  clear () {
    this.queue = []
  }

  stop () {
    this._stop = true
  }

  start () {
    this._stop = false
    let _this = this

    setTimeout(() => {
      function loadNext (worker) {
        if (_this._stop) {
          return
        }

        let item = _this.isFifo ? _this.queue.shift() : _this.queue.pop()
        if (item === undefined) {
          return
        }

        if (item.deferred.isCanceled()) {
          loadNext(worker)
          return
        }

        item.deferred.progress(1)
        let promise = worker.execute.apply(worker, item.args)
        promise.then((data) => {
          item.deferred.resolve(data)
          loadNext(worker, _this.queue)
        }, (err) => {
          item.deferred.reject(err)
          loadNext(worker, _this.queue)
        }, (progress) => {
          item.deferred.progress(progress)
        })
      }

      this.workers.filter((worker) => worker.isAvailable()).forEach((worker) => {
        loadNext(worker)
      })
    })
  }
}

export default QueuedLoader

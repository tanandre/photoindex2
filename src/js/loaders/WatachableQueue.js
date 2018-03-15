import Watchable from '../watchers/Watchable.js'

function notify (watchable, queue) {
  watchable.notify(queue)
}

class WatchableQueue {
  constructor () {
    this.queue = []
    this.watchable = new Watchable()
  }

  push (value) {
    let response = this.queue.push(value)
    notify(this.watchable, this.queue)
    return response
  }

  pop () {
    let item = this.queue.pop()
    notify(this.watchable, this.queue)
    return item
  }

  shift () {
    let item = this.queue.shift()
    notify(this.watchable, this.queue)
    return item
  }

  unshift () {
    let item = this.queue.unshift()
    notify(this.watchable, this.queue)
    return item
  }

  clear () {
    this.queue = []
    notify(this.watchable, this.queue)
  }

  size () {
    return this.queue.length
  }
}

export default WatchableQueue

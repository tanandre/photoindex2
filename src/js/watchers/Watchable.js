class Watchable {
  constructor () {
    this.watchers = []
  }

  watch (value) {
    let watchers = this.watchers
    watchers.push(value)
    return {
      remove () {
        let found = watchers.indexOf(value)
        if (found > -1) {
          watchers.splice(found, 1)
        }
      }
    }
  }

  notify (value) {
    this.watchers.forEach(w => {
      w(value)
    })
  }
}

export default Watchable

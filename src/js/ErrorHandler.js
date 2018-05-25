class ErrorHandler {
  constructor (store) {
    this.store = store
  }

  handle (error) {
    this.store.commit('error', error)
  }

  clearErrors () {
    this.store.commit('errors', [])
  }
}

export default ErrorHandler

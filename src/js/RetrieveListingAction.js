class RetrieveListingAction {
  constructor (store) {
    this.store = store
  }

  execute (route) {
    return this.store.dispatch('query', route.query.q).then(() => {
      this.store.dispatch('filter', route.query)
    })
  }
}

export default RetrieveListingAction

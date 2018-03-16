import FilterListingAction from './FilterListingAction'

class RetrieveListingAction {
  constructor (store) {
    this.store = store
  }

  execute (route) {
    return new Promise((resolve, reject) => {
      this.store.dispatch('query', route.query.q).then(() => {
        new FilterListingAction(this.store).execute(route).then(resolve).catch(reject)
      })
    })
  }
}

export default RetrieveListingAction

import FilterListingAction from './FilterListingAction'

class RetrieveListingAction {
  constructor (store) {
    this.store = store
  }

  execute (route) {
    return this.store.dispatch('query', route.query.q).then(() => {
      new FilterListingAction(this.store).execute(route)
    })
  }
}

export default RetrieveListingAction

class DataRetriever {
  constructor (jsonLoader, urlHelper, store) {
    this.jsonLoader = jsonLoader
    this.urlHelper = urlHelper
    this.store = store
  }

  retrieveImages (query) {
    if (this.promise && !this.promise.isDone()) {
      this.promise.cancel()
    }

    this.promise =
      this.jsonLoader.load(this.urlHelper.getListing(), {params: query})

    return this.promise
  }
}

export default DataRetriever

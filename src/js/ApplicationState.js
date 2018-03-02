class ApplicationState {
  setTagsUpdateTime (date) {
    this.tagsUpdateTime = date
  }

  getTagsUpdateTime () {
    return this.tagsUpdateTime ? '?' + this.tagsUpdateTime : ''
  }

  setListingUpdateTime (date) {
    this.listingUpdateTime = date
  }

  getListingUpdateTime () {
    return this.listingUpdateTime ? '?' + this.listingUpdateTime : ''
  }
}

export default ApplicationState

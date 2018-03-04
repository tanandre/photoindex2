function safeGet (value) {
  return (value !== null && value !== undefined) ? '?' + value : ''
}

class ApplicationState {
  setTagsUpdateTime (date) {
    localStorage.setItem('tagsUpdateTime', date)
  }

  getTagsUpdateTime () {
    return safeGet(localStorage.getItem('tagsUpdateTime'))
  }

  setListingUpdateTime (date) {
    localStorage.setItem('setListingUpdateTime', date)
  }

  getListingUpdateTime () {
    return safeGet(localStorage.getItem('setListingUpdateTime'))
  }
}

export default ApplicationState

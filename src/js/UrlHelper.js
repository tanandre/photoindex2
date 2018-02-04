class UrlHelper {
  constructor (store) {
    this.store = store
  }

  getListing () {
    console.log('serverUrl', this.store.state.serverUrl)
    return this.store.state.serverUrl + '/listing'
  }

  getStats () {
    return this.store.state.serverUrl + '/stats'
  }

  getThumbnailUrl (photo) {
    return this.getPhotoUrl(photo, 300)
  }

  getPhotoUrl (photo, width) {
    return this.store.state.serverUrl + '/photo/' + photo.id + (width === undefined ? '' : '/' + width)
  }

  getPhotoDateUrl (photo, dateInMillis) {
    return this.store.state.serverUrl + '/date/' + photo.id + '/' + dateInMillis
  }

  getTagsUrl (photo) {
    return this.store.state.serverUrl + '/tags/' + photo.id
  }

  getExifUrl (photo) {
    return this.store.state.serverUrl + '/exif/' + photo.id
  }
}

export default UrlHelper

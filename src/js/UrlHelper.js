class UrlHelper {
  constructor (store) {
    this.store = store
  }

  getListing () {
    // return this.store.state.serverUrl + '/listing'
    return '/photoindex' + '/php/listing.php'
  }

  getStats () {
    return this.store.state.serverUrl + '/stats'
  }

  getThumbnailUrl (photo) {
    return this.getPhotoUrl(photo, 1)
  }

  getAllTags () {
    return '/photoindex/php/tags.php'
  }

  getPhotoUrl (photo, width) {
    // return this.store.state.serverUrl + '/photo/' + photo.id + (width === undefined ? '' : '/' + width)
    return '/photoindex/php/photo.php?id=' + photo.id + (width === undefined ? '' : '&q=' + width)
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

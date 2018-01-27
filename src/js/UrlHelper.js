class UrlHelper {
  constructor (serverUrl) {
    this.serverUrl = serverUrl
  }

  getListing () {
    return this.serverUrl + '/listing'
  }

  getStats () {
    return this.serverUrl + '/stats'
  }

  getThumbnailUrl (photo) {
    return this.getPhotoUrl(photo, 300)
  }

  getPhotoUrl (photo, width) {
    return this.serverUrl + '/photo/' + photo.id + (width === undefined ? '' : '/' + width)
  }

  getPhotoDateUrl (photo, dateInMillis) {
    return this.serverUrl + '/date/' + photo.id + '/' + dateInMillis
  }
}

export default UrlHelper

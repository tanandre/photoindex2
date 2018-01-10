class UrlHelper {
  constructor (serverUrl) {
    this.serverUrl = serverUrl
  }

  getThumbnailUrl (photo) {
    return this.getPhotoUrl(photo, 300)
  }

  getPhotoUrl (photo, width) {
    return this.serverUrl + '/photo/' + photo.id + (width === undefined ? '' : '/' + width)
  }
}

export default UrlHelper

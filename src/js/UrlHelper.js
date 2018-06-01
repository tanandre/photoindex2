class UrlHelper {
  constructor (store) {
    this.store = store
  }

  getListing () {
    // return this.store.state.serverUrl + '/listing'
    return '/photoindex/php/listing.php'
  }

  getPhotoUpdateUrl () {
//    http://kanji/photoindex/php/update.php?id[]=20&id[]=19&date=2014-01-01%2012:00:42
    return '/photoindex/php/update.php'
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

  getPhotoUrl (photo, quality) {
    // return this.store.state.serverUrl + '/photo/' + photo.id + (width === undefined ? '' : '/' + width)
    return '/photoindex/php/photo.php?id=' + photo.id + (quality === undefined ? '' : '&q=' + quality)
  }

  getTagsUrl (photo) {
    return '/photoindex/php/tags.php?id=' + photo.id
//    return this.store.state.serverUrl + '/tags/' + photo.id
  }

  getExifUrl (photo) {
    // return this.store.state.serverUrl + '/exif/' + photo.id
    return '/photoindex/php/exif.php?id=' + photo.id
  }
}

export default UrlHelper

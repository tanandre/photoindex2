class PhpUrlHelper {
  getListing () {
    return '/photoindex/php/listing.php'
  }

  getThumbnailUrl (photo) {
    return this.getPhotoUrl(photo, 1)
  }

  getPhotoUpdateUrl () {
    return '/photoindex/php/update.php'
  }

  getAllTags () {
    return '/photoindex/php/tags.php'
  }

  getPhotoUrl (photo, width) {
    return '/photoindex/php/photo.php?id=' + photo.id + (width === undefined ? '' : '&q=' + width)
  }

  getTagsUrl (photo) {
    return '/photoindex/php/tags.php?id=' + photo.id
  }

  getExifUrl (photo) {
    return '/photoindex/php/exif.php?id=' + photo.id
  }
}

export default PhpUrlHelper
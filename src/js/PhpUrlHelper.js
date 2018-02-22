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

  getEditTagsUrl () {
    return '/photoindex/php/edittags.php'
  }

  getAllTags () {
    return '/photoindex/php/tags.php'
  }

  getPhotoUrl (photo, quality) {
    return '/photoindex/php/photo.php?id=' + photo.id + (quality === undefined ? '' : '&q=' + quality)
  }

  getTagsUrl (photo) {
    return '/photoindex/php/tags.php?id=' + photo.id
  }

  getExifUrl (photo) {
    return '/photoindex/php/exif.php?id=' + photo.id
  }
}

export default PhpUrlHelper

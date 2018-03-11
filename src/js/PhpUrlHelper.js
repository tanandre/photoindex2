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

  getPhotoEditDateUrl () {
    return '/photoindex/php/editdate.php'
  }

  getPhotoEditRatingUrl () {
    return '/photoindex/php/editrating.php'
  }

  getAddTagsUrl () {
    return '/photoindex/php/addtags.php'
  }

  getAddGroupUrl () {
    return '/photoindex/php/addgroup.php'
  }

  getTagGroupsUrl () {
    return '/photoindex/php/taggroups.php'
  }

  getEditTagsUrl () {
    return '/photoindex/php/edittags.php'
  }

  getAllTags () {
    return '/photoindex/php/tags.php'
  }

  getVideoUrl (photo) {
    return '/photoindex/php/video.php?id=' + photo.id + '&type=original'
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

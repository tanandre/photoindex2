class PhpUrlHelper {
  getListing (rating) {
    return '/static/demo/listing.json?rating=' + (rating !== undefined ? rating : 1)
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
    return '/static/demo/taggroups.json'
  }

  getEditTagsUrl () {
    return '/photoindex/php/edittags.php'
  }

  getAllTags () {
    return '/photoindex/php/tags.json'
  }

  getVideoUrl (photo, type) {
    return '/photoindex/php/video.php?id=' + photo.id + '&type=' + type
  }

  getPhotoUrl (photo, quality) {
    let size = quality === 1 ? '200' : '500'
    return `https://picsum.photos/id/${photo.id}/${size}`
  }

  getTagsUrl (photo) {
    return '/photoindex/php/tags.php?id=' + photo.id
  }

  getExifUrl (photo) {
    return '/photoindex/php/exif.php?id=' + photo.id
  }
}

export default PhpUrlHelper

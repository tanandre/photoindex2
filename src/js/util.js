export default {
  isVideo (photo) {
    return ['.avi', '.mp4', '.mov'].some(value => photo.path.toLowerCase().endsWith(value))
  },

  tagsToArray (tags) {
    return tags ? tags.split(',').map(t => decodeURIComponent(t)) : []
  },

  tagsToHashObject (tags) {
    return tags.map(encodeURIComponent).join(',')
  },

  isDate (value) {
    return /^\d{4,8}$/.test(value)
  },

  arrayContains (arr, item) {
    return arr.indexOf(item) !== -1
  },

  removeDuplicates (arr) {
    return Array.from(new Set(arr))
  },

  delay () {
    let timer = 0
    return (callback, ms) => {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  },

  mapTagsToGroups (tags) {
    let groups = tags.map(tagItem => tagItem.groupName)
    let responseMap = this.removeDuplicates(groups).map(group => {
      return {
        'name': group,
        'id': tags.find(tagItem => tagItem.groupName === group).groupId,
        'tags': tags.filter(tagItem => tagItem.groupName === group)
      }
    })
    return responseMap
  },

  /**
   * make sure the return value is an array if the input is not an array otherwise returns the input
   * @param value
   * @returns {*}
   */
  asArray (value) {
    if (Array.isArray(value)) {
      return value
    }
    return value ? [value] : []
  },

  addToArray (arr, value) {
    let found = arr.indexOf(value)
    if (found === -1) {
      arr.push(value)
    }
  },

  removeFromArray (arr, value) {
    let found = arr.indexOf(value)
    if (found > -1) {
      arr.splice(found, 1)
    }
  },

  imagesForCurrentPage (images, gallery) {
    let imagesPerPage = gallery.thumbnailsPerPage
    let begin = (gallery.page - 1) * imagesPerPage
    let end = Math.min(images.length, begin + imagesPerPage)
    return images.slice(begin, end)
  },

  browser: {
    isChrome () {
      return navigator.userAgent.indexOf('Chrome') !== -1
    },

    isFirefox () {
      return navigator.userAgent.indexOf('Firefox') !== -1
    }
  }
}

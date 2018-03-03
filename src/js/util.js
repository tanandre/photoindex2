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
  }
}

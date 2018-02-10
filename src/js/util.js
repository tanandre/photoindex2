export default {
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

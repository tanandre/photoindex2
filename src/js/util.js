export default {
  /**
   * make sure the return value is an array if the input is not an array otherwise returns the input
   * @param value
   * @returns {*}
   */
  asArray: function (value) {
    if (Array.isArray(value)) {
      return value
    }
    return value ? [value] : []
  },

  addToArray: function (arr, value) {
    let found = arr.indexOf(value)
    if (found === -1) {
      arr.push(value)
    }
  },

  removeFromArray: function (arr, value) {
    let found = arr.indexOf(value)
    if (found > -1) {
      arr.splice(found, 1)
    }
  }
}

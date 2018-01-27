class AlbumNavigator {
  constructor (router) {
    this.router = router
  }

  /**
   * Helper function does not change the state
   * @param tags
   * @returns {*}
   */
  tagsToArray (tags) {
    return tags ? tags.split(',') : []
  }

  /**
   * Helper function does not change the state
   * @param tags
   * @returns {*}
   */
  tagsToHashObject (tags) {
    return tags.join(',')
  }

  /**
   * Update the route state
   * @param tags
   */
  setTags (tags) {
    this.router.push({
      name: 'gallery',
      query: {
        q: tags
      }
    })
  }

  /**
   * Update the route state
   */
  clearPhoto () {
    this.setPhoto(-1)
  }

  /**
   * Update the route state
   * @param photoId
   */
  setPhoto (photoId) {
    this.router.push({
      name: 'gallery',
      params: {
        photoid: photoId === null ? -1 : photoId
      },
      query: this.router.history.current.query
    })
  }

  /**
   * Update the route state
   * @param page
   */
  setPage (page) {
    this.router.push({
      name: 'gallery',
      params: {
        page: page
      },
      query: this.router.history.current.query
    })
  }
}

export default AlbumNavigator

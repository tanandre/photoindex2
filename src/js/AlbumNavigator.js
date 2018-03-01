class AlbumNavigator {
  constructor (router) {
    this.router = router
  }

  setRating (rating, route) {
    this.router.push({
      name: 'gallery',
      query: {
        q: route.query.q,
        d: route.query.d,
        r: rating
      }
    })
  }

  setTags (tags, route) {
    this.router.push({
      name: 'gallery',
      query: {
        q: tags,
        d: route.query.d,
        r: route.query.r
      }
    })
  }

  setDates (dates, route) {
    this.router.push({
      name: 'gallery',
      query: {
        q: route.query.q,
        d: dates,
        r: route.query.r
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

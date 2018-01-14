class AlbumNavigator {
  constructor (router, route) {
    this.router = router
    this.route = route
  }

  clearPhoto () {
    this.setPhoto(-1)
  }

  setPhoto (photoId) {
    this.router.push({
      name: 'gallery',
      params: {
        photoid: photoId === null ? -1 : photoId
      }
    })
  }

  setPage (page) {
    if (page <= 0) {
      return
    }

    this.router.push({
      name: 'gallery',
      params: {
        page: page
      }
    })
  }
}

export default AlbumNavigator

class AlbumNavigator {
  constructor (router) {
    this.router = router
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
    this.router.push({
      name: 'gallery',
      params: {
        page: page
      }
    })
  }
}

export default AlbumNavigator

class AlbumNavigator {
  constructor (router) {
    this.router = router
  }

  setPage (page) {
    this.router.push({
      path: '/album/gallery/' + page
    })
  }
}

export default AlbumNavigator

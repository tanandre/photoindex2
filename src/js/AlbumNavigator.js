class AlbumNavigator {
  constructor (router) {
    this.router = router
  }

  setTags (tags) {
    console.log('setting tag:', tags)
    this.router.push({
      name: 'gallery',
      query: {
        q: tags
      }
    })
  }

  clearPhoto () {
    this.setPhoto(-1)
  }

  setPhoto (photoId) {
    console.log('set photo', photoId)
    this.router.push({
      name: 'gallery',
      params: {
        photoid: photoId === null ? -1 : photoId
      },
      query: this.router.history.current.query
    })
  }

  setPage (page) {
    console.log(this.router.history.current)
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

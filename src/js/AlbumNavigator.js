class AlbumNavigator {
  constructor (router) {
    this.router = router
  }

  tagsToArray (tags) {
    return tags ? tags.split(',') : []
  }

  tagsToHashObject (tags) {
    return tags.join(',')
  }

  setTags (tags) {
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
    this.router.push({
      name: 'gallery',
      params: {
        photoid: photoId === null ? -1 : photoId
      },
      query: this.router.history.current.query
    })
  }

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

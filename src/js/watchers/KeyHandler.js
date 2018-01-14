class KeyHandler {
  constructor (navigator) {
    this.navigator = navigator
  }

  handlKeyEventPhoto (key, album, selectedImage) {
    let idx = album.images.indexOf(selectedImage)
    if (key.keyCode === 27) {
      this.navigator.clearPhoto()
    } else if (key.keyCode === 37 && !key.altKey) {
      if (idx > 0) {
        this.navigator.setPhoto(album.images[idx - 1].id)
      }
    } else if (key.keyCode === 39 && !key.altKey) {
      if (idx < album.images.length - 1) {
        this.navigator.setPhoto(album.images[idx + 1].id)
      }
    }
  }

  handlKeyEventGallery (key, album) {
    let page = Number(album.currentPage) + 1
    if (key.keyCode === 49) {
      this.navigator.setPage(1)
    } else if (key.keyCode === 37 && !key.altKey) {
      if (page === 1) {
        return
      }
      this.navigator.setPage(page - 1)
    } else if (key.keyCode === 39 && !key.altKey) {
      this.navigator.setPage(page + 1)
    }
  }
}

export default KeyHandler

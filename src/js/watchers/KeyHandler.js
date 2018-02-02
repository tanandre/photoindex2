import store from '../../store.js'

class KeyHandler {
  constructor (navigator) {
    this.navigator = navigator
  }

  handlKeyEventPhoto (key) {
    let idx = store.state.album.images.indexOf(store.state.photo)
    if (key.keyCode === 27) {
      this.navigator.clearPhoto()
    } else if (key.keyCode === 37 && key.ctrlKey && !key.altKey) {
      if (idx > 0) {
        this.navigator.setPhoto(store.state.album.images[idx - 1].id)
      }
    } else if (key.keyCode === 39 && key.ctrlKey && !key.altKey) {
      if (idx < store.state.album.images.length - 1) {
        this.navigator.setPhoto(store.state.album.images[idx + 1].id)
      }
    }
  }

  handlKeyEventGallery (key) {
    let page = store.state.page
    if (key.keyCode === 36 && key.ctrlKey) { // HOME
      this.navigator.setPage(1)
    } else if (key.keyCode === 35 && key.ctrlKey) { // END
      this.navigator.setPage(0)
    } else if (key.keyCode === 37 && key.ctrlKey && !key.altKey) { // arrow left
      if (page === 1) {
        return
      }
      this.navigator.setPage(page - 1)
    } else if (key.keyCode === 39 && key.ctrlKey && !key.altKey) { // arrow right
      this.navigator.setPage(page + 1)
    }
  }
}

export default KeyHandler

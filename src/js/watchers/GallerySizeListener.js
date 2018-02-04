import store from '../../store.js'

let rows = 10

function getThumbnailsPerPage () {
  let width = window.screen.width
  if (width < 480) {
    return 3 * rows
  }
  if (width < 650) {
    return 4 * rows
  }
  if (width < 1024) {
    return 5 * rows
  }
  if (width < 1280) {
    return 6 * rows
  }
  return 7 * rows
}

class GallerySizeListener {
  calibrateThumbnails () {
    let thumbnailsPerPage = getThumbnailsPerPage()
    store.commit('gallery', {
      thumbnailsPerPage: thumbnailsPerPage,
      pageCount: Math.ceil(store.state.album.images.length / thumbnailsPerPage)
    })
  }
}

export default GallerySizeListener

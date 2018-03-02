import util from '../util'

function isPhotoInDateRange (photo, dates) {
  return dates.some(d => photo.date.replace(/[^\d]/g, '').startsWith(d))
}

class FilterListingAction {
  constructor (store) {
    this.store = store
  }

  execute (route) {
    let dates = route.query.d
    let rating = route.query.r
    let datesArray = util.tagsToArray(dates)
    if (datesArray.length === 0) {
      this.store.commit('images', this.store.state.album.all.filter(img => rating ? img.rating >= rating : true))
      // this.store.commit('album', {
      //   images: this.store.state.album.all.filter(img => rating ? img.rating >= rating : true),
      //   all: this.store.state.album.all
      // })
      return
    }
    let filteredImages = this.store.state.album.all.filter(img => img.rating >= rating).filter(img => isPhotoInDateRange(img, datesArray))
    this.store.commit('images', filteredImages)
    // this.store.commit('album', {
    //   images: filteredImages,
    //   all: this.store.state.album.all
    // })

    this.store.commit('query', route.query)
    return Promise.resolve()
  }
}

export default FilterListingAction

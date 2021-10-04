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
    let imagesFilteredByRating = this.store.state.album.all.filter(img => rating ? img.rating >= rating : true)
    if (datesArray.length === 0) {
      this.store.commit('images', imagesFilteredByRating)
      return Promise.resolve()
    }
    let filteredImages = imagesFilteredByRating.filter(img => isPhotoInDateRange(img, datesArray))
    this.store.commit('images', filteredImages)
    this.store.commit('query', route.query)
    return Promise.resolve()
  }
}

export default FilterListingAction

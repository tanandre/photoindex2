import util from '@/js/util'

const selectionModule = {
  state: {
    selectedPhotos: []
  },
  mutations: {
    selectedPhotos (state, photos) {
      state.selectedPhotos = photos
    },

    selectPhoto (state, photo) {
      state.selectedPhotos.push(photo)
    },

    deselectPhoto (state, photo) {
      util.removeFromArray(state.selectedPhotos, photo)
    }
  }
}
export default selectionModule

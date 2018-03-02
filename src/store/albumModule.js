const albumModule = {
  state: {
    // photo: null,
    images: [],
    all: []
  },
  mutations: {
    // photo (state, photo) {
    //   state.photo = photo
    // },
    images (state, images) {
      state.images = images
    },
    all (state, all) {
      state.all = all
    }
  }
}
export default albumModule

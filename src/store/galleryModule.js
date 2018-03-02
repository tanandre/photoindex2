const galleryModule = {
  state: {
    thumbnailsPerPage: 0,
    pageCount: 0,
    page: 0
  },
  mutations: {
    thumbnailsPerPage (state, thumbnailsPerPage) {
      state.thumbnailsPerPage = thumbnailsPerPage
    },
    pageCount (state, pageCount) {
      state.pageCount = pageCount
    },
    page (state, page) {
      state.page = page
    }
  }
}

export default galleryModule

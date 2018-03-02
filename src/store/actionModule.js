const actionModule = {
  state: {
    showEditDate: false,
    showEditTags: false,
    showEditRating: false
  },
  mutations: {
    showEditDate (state, showEditDate) {
      state.showEditDate = showEditDate
    },
    showEditRating (state, showEditRating) {
      state.showEditRating = showEditRating
    },
    showEditTags (state, showEditTags) {
      state.showEditTags = showEditTags
    }
  }
}

export default actionModule

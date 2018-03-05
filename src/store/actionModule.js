const actionModule = {
  state: {
    showEditDate: false,
    showEditTags: false,
    showEditTagGroups: false,
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
    },
    showEditTagGroups (state, value) {
      state.showEditTagGroups = value
    }
  }
}

export default actionModule

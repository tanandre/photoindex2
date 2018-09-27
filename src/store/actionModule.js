const actionModule = {
  state: {
    showHUD: false,
    showEditDate: false,
    showEditTags: false,
    showEditTagGroups: false,
    showEditRating: false
  },
  mutations: {
    showEditDate (state, value) {
      state.showEditDate = value
    },
    showEditRating (state, value) {
      state.showEditRating = value
    },
    showEditTags (state, value) {
      state.showEditTags = value
    },
    showEditTagGroups (state, value) {
      state.showEditTagGroups = value
    },
    showHUD (state, value) {
      state.showHUD = value
    }
  }
}

export default actionModule

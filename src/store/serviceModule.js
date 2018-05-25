export default {
  state: {
    urlHelper: null,
    dataUpdater: null,
    dataRetriever: null,
    thumbnailLoader: null,
    photoLoader: null,
    keyHandler: null,
    navigator: null
  },
  mutations: {
    urlHelper (state, value) {
      state.urlHelper = value
    },
    dataUpdater (state, value) {
      state.dataUpdater = value
    },
    dataRetriever (state, value) {
      state.dataRetriever = value
    },
    keyHandler (state, value) {
      state.keyHandler = value
    },
    thumbnailLoader (state, value) {
      state.thumbnailLoader = value
    },
    photoLoader (state, value) {
      state.photoLoader = value
    },
    navigator (state, value) {
      state.navigator = value
    }
  }
}

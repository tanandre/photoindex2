import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'

Vue.use(Vuex)

function tagsToArray (tags) {
  return tags ? tags.split(',') : []
}

const store = new Vuex.Store({
  state: {
    page: 0,
    photo: null,
    album: {
      images: [],
      imageItems: []
    }
  },
  mutations: {
    page (state, newPage) {
      state.page = newPage
    },

    photo (state, photo) {
      state.photo = photo
    },

    album (state, album) {
      state.album = album
    }
  },
  actions: {
    photo ({commit, state}, photoId) {
      let foundPhoto = photoId === -1 ? null : state.album.images.find(photo => {
        return photo.id === photoId
      })
      commit('photo', foundPhoto === undefined ? null : foundPhoto)
    },
    query ({commit}, q) {
      return injector.get('dataRetriever').retrieveImages({tag: tagsToArray(q)}).then((response) => {
        commit('album', {
          images: response.body,
          imageItems: []
        })
      })
    }
  }
})

export default store

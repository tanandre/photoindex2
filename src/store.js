import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'

Vue.use(Vuex)

function tagsToArray (tags) {
  return tags ? tags.split(',').map(t => decodeURIComponent(t)) : []
}

const store = new Vuex.Store({
  state: {
    page: 0,
    photo: null,
    loading: false,
    album: {
      images: [],
      imageItems: []
    },
    gallery: {
      thumbnailsPerPage: 0,
      pageCount: 0
    }
  },
  mutations: {
    loading (state, loading) {
      state.loading = loading
    },
    page (state, newPage) {
      state.page = newPage
    },

    gallery (state, gallery) {
      state.gallery = gallery
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
      commit('loading', true)
      return injector.get('dataRetriever').retrieveImages({tag: tagsToArray(q)}).then((response) => {
        commit('album', {
          images: response.body,
          imageItems: []
        })
        commit('loading', false)
      }).catch(() => {
        commit('loading', false)
      })
    }
  }
})

export default store

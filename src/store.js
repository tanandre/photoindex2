import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'
import util from './js/util'
import actionModule from './store/actionModule'
import selectionModule from './store/selectionModule'
import galleryModule from './store/galleryModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    selection: selectionModule,
    action: actionModule,
    gallery: galleryModule
  },
  state: {
    serverUrl: localStorage.getItem('serverUrl'),
    photo: null,
    loading: false,
    errors: [],
    query: {},
    album: {
      images: [],
      all: []
    }
  },
  mutations: {
    query (state, query) {
      state.query = query
    },
    error (state, error) {
      state.errors.push(error)
    },

    errors (state, errors) {
      state.errors = errors
    },

    serverUrl (state, serverUrl) {
      state.serverUrl = serverUrl
    },

    loading (state, loading) {
      state.loading = loading
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
        return Number(photo.id) === photoId
      })
      if (foundPhoto === undefined && photoId !== -1) {
        throw new Error('could not find photo with photoId: ' + photoId)
      }
      commit('photo', foundPhoto === undefined ? null : foundPhoto)
      return Promise.resolve()
    },

    query ({commit}, q) {
      commit('loading', true)
      return injector.get('dataRetriever').retrieveImages({tag: util.tagsToArray(q)}).then((response) => {
        commit('album', {
          images: response.body,
          all: response.body
        })
        commit('loading', false)
      }).catch(err => {
        commit('error', 'Error retrieving images: ' + err.status + ' ' + err.statusText + ' (query=' + q + ')')
        commit('loading', false)
      })
    }
  }
})

export default store

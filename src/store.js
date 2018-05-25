import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'
import util from './js/util'
import actionModule from './store/actionModule'
import selectionModule from './store/selectionModule'
import galleryModule from './store/galleryModule'
import albumModule from './store/albumModule'
import serviceModule from './store/serviceModule'
import stateModule from './store/stateModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    selection: selectionModule,
    action: actionModule,
    gallery: galleryModule,
    album: albumModule,
    service: serviceModule,
    state: stateModule
  },
  state: {
    serverUrl: localStorage.getItem('serverUrl'),
    photo: null,
    loading: false,
    errors: [],
    query: {}
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

    query ({commit, state}, q) {
      commit('loading', true)
      return state.service.dataRetriever.retrieveImages({tag: util.tagsToArray(q)}).then((response) => {
        commit('images', response.body)
        commit('all', response.body)
        commit('loading', false)
      }).catch(err => {
        commit('error', 'Error retrieving images: ' + err.status + ' ' + err.statusText + ' (query=' + q + ')')
        commit('loading', false)
      })
    }
  }
})

export default store

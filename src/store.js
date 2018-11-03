import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'
import util from '@/js/util'
import actionModule from '@/store/actionModule'
import galleryModule from '@/store/galleryModule'
import selectionModule from '@/store/selectionModule'
import albumModule from '@/store/albumModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    selection: selectionModule,
    action: actionModule,
    gallery: galleryModule,
    album: albumModule
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

    query ({commit}, q) {
      commit('loading', true)
      return injector.get('dataRetriever').retrieveImages({tag: util.tagsToArray(q)}).then((response) => {
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

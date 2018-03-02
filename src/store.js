import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'
import util from './js/util'
import actionModule from './store/actionModule'
import selectionModule from './store/selectionModule'

Vue.use(Vuex)

function isPhotoInDateRange (photo, dates) {
  return dates.some(d => photo.date.replace(/[^\d]/g, '').startsWith(d))
}

const store = new Vuex.Store({
  modules: {
    selection: selectionModule,
    action: actionModule
  },
  state: {
    serverUrl: localStorage.getItem('serverUrl'),
    page: 0,
    photo: null,
    loading: false,
    errors: [],
    rating: 3,
    album: {
      images: [],
      all: []
    },
    gallery: {
      thumbnailsPerPage: 0,
      pageCount: 0
    }
  },
  mutations: {
    rating (state, rating) {
      state.rating = rating
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
        return Number(photo.id) === photoId
      })
      if (foundPhoto === undefined && photoId !== -1) {
        throw new Error('could not find photo with photoId: ' + photoId)
      }
      commit('photo', foundPhoto === undefined ? null : foundPhoto)
    },

    filter ({commit, state}, query) {
      let dates = query.d
      let rating = query.r
      let datesArray = util.tagsToArray(dates)
      if (datesArray.length === 0) {
        commit('album', {
          images: state.album.all.filter(img => rating ? img.rating >= rating : true),
          all: state.album.all
        })
        return
      }
      let filteredImages = state.album.all.filter(img => img.rating >= rating).filter(img => isPhotoInDateRange(img, datesArray))
      commit('album', {
        images: filteredImages,
        all: state.album.all
      })
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

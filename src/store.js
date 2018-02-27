import Vue from 'vue'
import Vuex from 'vuex'
import injector from 'vue-inject'
import util from './js/util'

Vue.use(Vuex)

function isPhotoInDateRange (photo, dates) {
  return dates.some(d => photo.date.replace(/[^\d]/g, '').startsWith(d))
}

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

const selectionModule = {
  state: {
    selectedPhotos: []
  },
  mutations: {
    selectedPhotos (state, photos) {
      state.selectedPhotos = photos
    },

    selectPhoto (state, photo) {
      state.selectedPhotos.push(photo)
    },

    deselectPhoto (state, photo) {
      util.removeFromArray(state.selectedPhotos, photo)
    }
  }
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
      console.log('committing photo')
      commit('photo', foundPhoto === undefined ? null : foundPhoto)
    },

    filter ({commit, state}, dates) {
      let datesArray = util.tagsToArray(dates)
      if (datesArray.length === 0) {
        console.log('dates empty setting all')
        commit('album', {
          images: state.album.all,
          all: state.album.all
        })
        return
      }
      let filteredImages = state.album.all.filter(img => isPhotoInDateRange(img, datesArray))
      console.log('filter')
      commit('album', {
        images: filteredImages,
        all: state.album.all
      })
    },

    query ({commit}, q) {
      // TODO when querying blank use parameter currentDate and add cache headers
      commit('loading', true)
      console.log('query', q)
      return injector.get('dataRetriever').retrieveImages({tag: util.tagsToArray(q)}).then((response) => {
        commit('album', {
          images: response.body,
          all: response.body,
          imageItems: []
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

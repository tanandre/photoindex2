import Vue from 'vue'
import Router from 'vue-router'
import PhotoAlbum from '@/components/PhotoAlbum'
import store from '../store.js'
import RetrieveListingAction from '../js/RetrieveListingAction'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    redirect: '/gallery/1/photo/-1'
  }, {
    path: '/gallery/:page/photo/:photoid',
    name: 'gallery',
    component: PhotoAlbum
  }]
})

router.beforeEach((to, from, next) => {
  if (to.params.photoid !== from.params.photoid) {
    // this branch is hit when opening directly on photo
    if (store.state.album.images.length > 0) {
      store.dispatch('photo', Number(to.params.photoid))
      store.commit('showEditDate', false)
    }
  } else if (to.query.d !== from.query.d || to.query.r !== from.query.r) {
    store.dispatch('filter', to.query)
  } else if (to.query.q !== from.query.q) {
    new RetrieveListingAction(store).execute(to)
  } else if (to.params.page !== from.params.page) {
    store.commit('page', Number(to.params.page))
  }
  next()
})

export default router

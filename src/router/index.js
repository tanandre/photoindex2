import Vue from 'vue'
import Router from 'vue-router'
import PhotoAlbum from '@/components/PhotoAlbum'
import store from '../store.js'
import util from '../js/util.js'

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
    store.dispatch('photo', Number(to.params.photoid))
  } else if (to.query.d !== from.query.d) {
    console.log('search by date', to.query.d)
    store.dispatch('filter', to.query.d)

  } else if (to.query.q !== from.query.q) {
    store.dispatch('query', to.query.q)

  } else if (to.params.page !== from.params.page) {
    store.commit('page', Number(to.params.page))
  }

  next()
})

export default router

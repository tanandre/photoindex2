import Vue from 'vue'
import Router from 'vue-router'
import PhotoAlbum from '@/components/PhotoAlbum'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/gallery/1/photo/-1'
    // redirect: '/album/gallery/1'
  }, {
    path: '/gallery/:page/photo/:photoid',
    // path: '/album/gallery/:page',
    name: 'gallery',
    component: PhotoAlbum
  }]
})

import Vue from 'vue'
import Router from 'vue-router'
import PhotoAlbum from '@/components/PhotoAlbum'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'PhotoAlbum',
    component: PhotoAlbum
  }]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import injector from 'vue-inject'
import VueResource from 'vue-resource'
import store from './store'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import Assembler from '@/js/Assembler'

Vue.use(injector)
Vue.use(VueResource)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Assembler(injector, Vue.http, router, store).assemble()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})

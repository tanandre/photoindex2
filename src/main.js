// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import injector from 'vue-inject'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

// fix issue: https://github.com/vuematerial/vue-material/issues/1182
import VueMaterial from 'vue-material'

import {MdField, MdToolbar, MdIcon, MdButton, MdContent, MdTabs, MdProgress, MdSnackbar} from 'vue-material/dist/components'
import VueResource from 'vue-resource'

Vue.use(injector)
Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdProgress)
Vue.use(MdField)
Vue.use(MdSnackbar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

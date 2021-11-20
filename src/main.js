import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import 'reset-css'
import store from '@/store'
import router from '@/router'
import '@/assets/styles/main.css'

Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

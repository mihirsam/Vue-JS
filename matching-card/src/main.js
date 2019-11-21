import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(require("moment"));

new Vue({
  render: h => h(App),
}).$mount('#app')

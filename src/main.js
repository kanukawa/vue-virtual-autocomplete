import Vue from 'vue'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

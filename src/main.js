import 'weui/dist/style/weui.css'
import 'flag-icon-css/css/flag-icon.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Vue from 'vue'
import VeGauge from 'v-charts/lib/gauge.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VueClipboards from 'vue-clipboards'
import App from '@/App'
import router from '@/router'

Vue.component(VeGauge.name, VeGauge)
Vue.component(VeHistogram.name, VeHistogram)
Vue.use(VueClipboards)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

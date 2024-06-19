import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//公共css文件
import '@/assets/css/common.css'
import '@/assets/css/iconfont.css'
//淘宝无线适配
import '@/assets/js/flexible'

import LyTab from 'ly-tab';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import fastClick from 'fastclick'
fastClick.attach(document.body);

Vue.use(Vant);
Vue.use(LyTab);
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

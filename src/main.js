import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import './js/drawer-drag'
//拖拽js

// 个地方很近

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

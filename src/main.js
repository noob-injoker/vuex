import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './bus'
import './globleComponents'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';

Vue.use(IntroJs);
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

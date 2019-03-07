/*入口文件*/
import Vue from 'vue';

// 引入element-ui
import ElementUI from 'element-ui';  // js组件
import 'element-ui/lib/theme-chalk/index.css'; // 样式

// base.css
import './assets/styles/css/base.less'
// iconfont.css
import './assets/styles/css/iconfont.css';

import App from './App.vue'
import router from './router'

// 使用element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

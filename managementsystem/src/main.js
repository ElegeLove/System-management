/*入口文件*/
import Vue from 'vue';

// 引入element-ui
import ElementUI from 'element-ui'; // js组件
import 'element-ui/lib/theme-chalk/index.css'; // 样式

// base.css
import './assets/styles/css/base.less'
// iconfont.css
import './assets/styles/css/iconfont.css';

import App from './App.vue'
import router from './router'

// request.js
import request from './api/request'

// 把request挂载Vue的原型上 所有vue实例对象共享
Vue.prototype.req = request;

// 使用element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	// 获取浏览器token
	const token = window.localStorage.getItem('my-de-key')
	// 如果没有token
	if(!token) {
		// 如果去的是登录
		if(to.path === '/login') {
			next(); // 放行
		} else {
			// 否则 跳转到登录
			next({ path: '/login' })
		}
	} else {
		next(); // 放行
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
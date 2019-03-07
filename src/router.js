import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //登陆
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    },
    //后端首页(容器组件)
    {
      path: '/index',
      component: () => import('./views/Index/Index.vue'),
      children:[
        // 默认就是系统信息
        {
          path: '',
          name: '',
          component: () => import('./views/Systeminfo/Systeminfo.vue')
        },
        // 会员部分
        {
          path: '/index/Vipmanage',
          name: 'accountadd',
          component: () => import('./views/Vipmanage/Vipmanage.vue')
        },
        {
          path: '/index/Vipadd',
          name: 'accountadd',
          component: () => import('./views/Vipadd/Vipadd.vue')
        },
        // 账号部分
        {
          path: '/index/accountadd',
          name: 'accountadd',
          component: () => import('./views/Addaccount/Accountadd.vue')
        },
        {
          path: '/index/accountmanage',
          name: 'accountmanage',
          component: () => import('./views/Accountmanage/Accountmanage.vue')
        },
        {
          path: '/index/passwordmodify',
          name: 'passwordmodify',
          component: () => import('./views/Passwordmodify/Passwordmodify.vue')
        },
        //商品部分
        {
          path: '/index/goodsadd',
          name: 'goodsadd',
          component: () => import('./views/Goodsadd/Goodsadd.vue')
        },
        {
          path: '/index/goodsmanage',
          name: 'goodsmanage',
          component: () => import('./views/Goodsmanage/Goodsmanage.vue')
        },
        //库存管理
        {
          path: '/index/stockadd',
          name: 'stockadd',
          component: () => import('./views/Stockadd/Stockadd.vue')
        },
        {
          path: '/index/stockmanage',
          name: 'stockmanage',
          component: () => import('./views/Stockmanage/Stockmanage.vue')
        },
        //出货管理
        {
          path: '/index/saleslist',
          name: 'saleslist',
          component: () => import('./views/Saleslist/Saleslist.vue')
        },
        {
          path: '/index/outboundgoods',
          name: 'outboundgoods',
          component: () => import('./views/Outboundgoods/Outboundgoods.vue')
        },
        {
          path: '/index/goodsreturn',
          name: 'goodsreturn',
          component: () => import('./views/Goodsreturn/Goodsreturn.vue')
        },
        //统计管理
        {
          path: '/index/salesstatistics',
          name: 'salesstatistics',
          component: () => import('./views/Salesstatistics/Salesstatistics.vue')
        },
        {
          path: '/index/stockstatistics',
          name: 'stockstatistics',
          component: () => import('./views/Stockstatistics/Stockstatistics.vue')
        }
      ]

    },
    

  ]
})

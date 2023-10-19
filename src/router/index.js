import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/house/unit',
        name: 'houseunit',
        component: () => import('../views/HouseUnit.vue')
      },
      {
        path: '/house/unit/add',
        name: 'houseunitadd',
        component: () => import('../views/AddHouse.vue')
      },
      {
        path: '/house/unit/add/:id',
        name: 'houseunitadd',
        component: () => import('../views/AddHouse.vue')
      }, {
        path: '/house/show/:id',
        name: 'houseshow',
        component: () => import('../views/ShowHouse.vue')
      }, {
        path: '/house/number',
        name: 'housesnum',
        component: () => import('../views/HouseNum.vue')
      },
      {
        path: '/house/editnum/:id',
        name: 'editnum',
        component: () => import('../views/EditNum.vue')
      },
      {
        path: '/house/msg',
        name: 'housemsg',
        component: () => import('../views/HouseMsg.vue')
      },
      {
        path: '/parking/parkMessage',
        name: 'parkMessage',
        component: () => import('../views/ParkMsg.vue')
      }, {
        path: '/parking/parkpay',
        name: 'pakpay',
        component: () => import('../views/ParkPay.vue')
      },
      {
        path: 'pay/payType',
        name: 'paytype',
        component: () => import('../views/PayType.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')


  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.path === '/login') return next()
  if (!token) {
    return next('/login')
  }
  next()
})
export default router

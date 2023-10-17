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

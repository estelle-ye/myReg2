import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/userInfo.vue')
  },
  {
    path: '/survery',
    name: 'survery',
    component: () => import(/* webpackChunkName: "survery" */ '../views/Survery.vue')
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: () => import(/* webpackChunkName: "ticket" */ '../views/Ticket.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/comfirmation',
    name: 'Comfirmation',
    component: () => import(/* webpackChunkName: "Comfirmation" */ '../views/Comfirmation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

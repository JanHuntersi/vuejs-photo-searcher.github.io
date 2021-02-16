import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/unsplash',
    name: 'Unsplash',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Unsplash.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

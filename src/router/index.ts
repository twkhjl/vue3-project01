import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    // admin-panel
    // =============================================================

    {
      path: '/admin/login',
      name: 'admin.login',
      component: () => import('../views/admin-panel/Login.vue')
    },

    {
      path: '/admin/',
      name: 'admin-panel',
      component: () => import('../views/admin-panel/AdminPanelView.vue'),
      children:[
        {
          path: '',
          name: 'admin.main',
          component: () => import('../views/admin-panel/Main.vue')
        },
        {
          path: 'ttt',
          name: 'ttt',
          component: () => import('../views/admin-panel/Ttt.vue')
        },
        {
          path: 'categories',
          name: 'admin.categories',
          component: () => import('../views/admin-panel/Categories.vue')
        },
        
      ]
    },

  ]
})

export default router

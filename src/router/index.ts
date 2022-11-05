import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
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
        {
          path: 'categories/new',
          name: 'admin.categories.new',
          component: () => import('../views/admin-panel/CreateNewCategoryView.vue')
        },
        
      ]
    },

  ]
})

export default router

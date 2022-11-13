import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore as useAdminAuthStore } from '@/stores/admin-panel/auth/admin_auth'
import { useStorageStore } from '@/stores/admin-panel/auth/admin_storage'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    // admin-panel
    // =============================================================

    {
      path: '/admin/login',
      name: 'admin.login',
      component: () => import('../views/admin-panel/Login.vue'),
    },

    {
      path: '/admin/',
      name: 'admin-panel',
      component: () => import('../views/admin-panel/AdminPanelView.vue'),
      children: [
        {
          path: '',
          name: 'admin.main',
          component: () => import('../views/admin-panel/Main.vue'),
        },
        {
          path: 'ttt',
          name: 'admin.ttt',
          component: () => import('../views/admin-panel/Ttt.vue'),
        },
        {
          path: 'categories',
          name: 'admin.categories',
          component: () => import('../views/admin-panel/Categories.vue'),
        },
        {
          path: 'categories/new',
          name: 'admin.categories.new',
          component: () =>
            import('../views/admin-panel/CreateNewCategoryView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to: any) => {
  const auth = useAdminAuthStore()
  const storage = useStorageStore()
  const regAdminURL = /^admin\..*$/

  if (to.name == 'admin.login') {
    if (storage.getAdmin() && storage.getToken()) {
      const result = await auth.isAuthenticated()
      if (result) {
        return { name: 'admin.main' }
      }
    }
    return
  }

  if (regAdminURL.test(to.name) && to.name !== 'admin.login') {
    const result = await auth.isAuthenticated()

    if (!result) {
      return { name: 'admin.login' }
    }
    return
  }
})

export default router

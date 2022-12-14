import { ref } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './admin_storage'

export const useAuthStore = defineStore('admin_auth', () => {
  const API_ROOT_URL =
    import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_ADMIN_URL
  const API_REFRESH_URL =
    API_ROOT_URL + import.meta.env.VITE_API_ADMIN_REFRESH_URL
  const API_ME_URL = API_ROOT_URL + import.meta.env.VITE_API_ADMIN_ME_URL

  const storage = useStorageStore()
  const fetchData = useFetchData()

  const isTokenAutoRefresh = ref(false)

  async function isAuthenticated() {
    const token: any = storage.getToken()
    const admin: any = storage.getAdmin()
    if (!token || !admin) {
      return false
    }

    fetchData.setTokenToHeader(token)
    const result: any = await fetchData.postData(API_ME_URL)

    // -------------------------------------------

    if (result.error) {
      if (result.error !== 'expire') {
        console.log('token expired')

        return false
      }
      if (!isTokenAutoRefresh.value) {
        return false
      }

      try {
        const expiredToken = token
        const result: any = refreshToken(expiredToken)
        if (result.error) {
          return false
        }

        return true
      } catch (error) {
        return false
      }
    }

    if (
      result.role &&
      result.role === 'admin' &&
      result.name &&
      admin.role === result.role &&
      admin.name === result.name
    ) {
      return true
    }

    return false
  }
  async function refreshToken(token: string) {
    fetchData.setTokenToHeader(token)
    return await fetchData.postData(API_REFRESH_URL)
  }
  async function login(user: any) {
    const url = 'login'
    const data: any = await fetchData.postData(API_ROOT_URL + url, user)

    return data
  }
  async function logout() {
    const token = storage.getToken()
    if (!token) {
      return false
    }
    fetchData.setTokenToHeader(token)
    const url = 'logout'
    const data: any = await fetchData.postData(API_ROOT_URL + url)
    return data
  }

  return {
    isAuthenticated,
    refreshToken,
    login,
    logout,
  }
})

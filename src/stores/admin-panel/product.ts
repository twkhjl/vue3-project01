import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './auth/admin_storage'

export const useProductStore = defineStore('product', () => {
  const API_ROOT_URL =
    import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_PRODUCT_URL

  const storage: any = useStorageStore()
  const fetchData = useFetchData()

  onMounted(() => {
    fetchData.setTokenToHeader(storage.getToken())
  })

  async function paginate() {
    const url = 'paginate'
    const result: any = await fetchData.getData(API_ROOT_URL + url)
    return result
  }

  return {
    paginate,
  }
})

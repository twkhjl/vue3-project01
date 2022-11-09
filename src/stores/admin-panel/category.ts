import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './auth/admin_storage'

export const useCategoryStore = defineStore('category', () => {
    const API_ROOT_URL =
        import.meta.env.VITE_API_ROOT_URL +
        import.meta.env.VITE_API_CATEGORY_URL

    const storage: any = useStorageStore()
    const fetchData = useFetchData()

    onMounted(() => {
        fetchData.setTokenToHeader(storage.getToken())
    })

    async function all() {
        const url = 'all'
        const result: any = await fetchData.getData(API_ROOT_URL + url)
        return result
    }

    async function show(category_id: number) {
        const url = `show/${category_id}`
        const result: any = await fetchData.getData(API_ROOT_URL + url)
        return result
    }

    async function store(data: any) {
        const url = 'store'
        const result: any = await fetchData.postData(API_ROOT_URL + url, data)
        return result
    }
    async function update(data: any) {
        const url = 'update'
        const result: any = await fetchData.postData(API_ROOT_URL + url, data)
        return result
    }
    interface DATA_TO_DESTROY {
        id: number
    }
    async function destroy(data: DATA_TO_DESTROY) {
        const url = 'destroy'
        const result: any = await fetchData.postData(API_ROOT_URL + url, data)
        return result
    }

    return {
        all,
        show,
        store,
        update,
        destroy,
    }
})

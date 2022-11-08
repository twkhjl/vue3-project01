import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import  ajax  from '../../helpers/ajax'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './auth/admin_storage'

export const useCategoryStore = defineStore('category', () => {
  
  const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL+import.meta.env.VITE_API_CATEGORY_URL;
  
  const storage:any = useStorageStore();
  const fetchData = useFetchData();



  onMounted(()=>{
    fetchData.setTokenToHeader(storage.getToken());
  })

  async function all(){
    let url = 'all';
    let result:any = await fetchData.getData(API_ROOT_URL+url);
    return result;
  }

  async function store(data:any){
    let url = 'store';
    let result:any = await fetchData.postData(API_ROOT_URL+url, data);
    return result;
  }
  interface DATA_TO_DESTROY{
    id:number
  }
  async function destroy(data:DATA_TO_DESTROY){
    let url = 'destroy';
    let result:any = await fetchData.postData(API_ROOT_URL+url, data);
    return result;
  }

  return {
    all,
    store,
    destroy,
  }

})

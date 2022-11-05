import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import  ajax  from '../../helpers/ajax'
import { useAdminStore } from './admin'

export const useCategoryStore = defineStore('category', () => {

  let _is_loading=ref(false);
  function start_loading(){
    _is_loading.value=true;
  }
  function stop_loading(){
    _is_loading.value=false;
  }
  function is_loading(){
    return _is_loading.value;
  }

 

  const adminStore = useAdminStore();

  const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL+import.meta.env.VITE_API_CATEGORY_URL;

  async function all(){
    
    await adminStore.validataAdminState();

    let url = 'all';
    ajax.setTokenToHeader(adminStore.getToken());
    
    let result:any = await ajax.getData(API_ROOT_URL+url);
    result = await result.json();
    return result;
  }

  async function store(data:any){

    await adminStore.validataAdminState();
    
    let url = 'store';
    ajax.setTokenToHeader(adminStore.getToken());

    let result:any = await ajax.postData(API_ROOT_URL+url, data);
    result = await result.json();
    return result;
  }
  interface DATA_TO_DESTROY{
    id:number
  }
  async function destroy(data:DATA_TO_DESTROY){

    await adminStore.validataAdminState();
    
    let url = 'destroy';
    ajax.setTokenToHeader(adminStore.getToken());

    let result:any = await ajax.postData(API_ROOT_URL+url, data);
    result = await result.json();
    return result;
  }
  

  
  

  return {
    start_loading,
    stop_loading,
    is_loading,
    all,
    store,
    destroy,
  }

})

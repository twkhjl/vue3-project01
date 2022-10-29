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

  const API_ROOT_URL = 'https://vue3-project01-api.twkhjl-test.duckdns.org/api/category/';

  // ajax.clearHeader();
  // ajax.setHeader({
  //   'content-Type': 'multipart/form-data'
  // });

  async function all(){
    
    await adminStore.autoRefreshAdminToken();

    let url = 'all';
    ajax.setTokenToHeader(adminStore.getToken());
    
    let result = await ajax.getData(API_ROOT_URL+url);
    result = await result.json();
    return result;
  }

  async function store(data:any){
    
    await adminStore.autoRefreshAdminToken();
    let url = 'store';
    let result = await ajax.postData(API_ROOT_URL+url, data);
    result = await result.json();
    return result;
  }
  
  

  return {
    start_loading,
    stop_loading,
    is_loading,
    all,
    store,
  }

})

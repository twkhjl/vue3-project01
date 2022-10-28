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

  ajax.setApiRootUrl(API_ROOT_URL);
  // ajax.clearHeader();
  // ajax.setHeader({
  //   'content-Type': 'multipart/form-data'
  // });
  ajax.setTokenToHeader(adminStore.getToken());
  

  async function store(data:any){
    let url = 'store';
    let result = await ajax.postData(url, data);
    result = await result.json();
    return result;
  }
  

  return {
    start_loading,
    stop_loading,
    is_loading,

    store,
  }

})

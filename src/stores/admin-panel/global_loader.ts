import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import router from '@/router';
import ajax from '../../helpers/ajax'

export const useGlobalLoaderStore = defineStore('global_loader', () => {

  const _is_loading = ref(false);
  
  function start_loading(){
    _is_loading.value = true;
  };
   function stop_loading(){
    _is_loading.value = false;
  }
  function is_loading(){
    return _is_loading.value;
  }

  return {
    start_loading,
    stop_loading,
    is_loading
  }
})

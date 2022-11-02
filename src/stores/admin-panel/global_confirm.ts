import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import router from '@/router';
import ajax from '../../helpers/ajax'

export const useGlobalConfirmStore = defineStore('global_confirm', () => {

  const _is_show = ref(false);
  
  function show(){
    _is_show.value = true;
  };
   function hide(){
    _is_show.value = false;
  }
  function toggle(){
    _is_show.value = !_is_show.value;
  };
  function is_show(){
    return _is_show.value;
  }

  return {
    show,
    hide,
    toggle,
    is_show
  }
})

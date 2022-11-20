import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalLoaderStore = defineStore('global_loader', () => {
  const _is_loading = ref(false)

  function start_loading() {
    _is_loading.value = true
  }
  function stop_loading() {
    _is_loading.value = false
  }
  function is_loading() {
    return _is_loading.value
  }

  return {
    start_loading,
    stop_loading,
    is_loading,
  }
})

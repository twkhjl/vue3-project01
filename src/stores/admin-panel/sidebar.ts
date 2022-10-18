import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {

  let hideSidebar = ref(true);
  let loading = ref(false);



  function isSidebarHidden() {
    return hideSidebar.value;
  }
  function toggleSidebar(){
    hideSidebar.value=!hideSidebar.value;
  }
  

  return {
    isSidebarHidden,
    toggleSidebar
  }
})

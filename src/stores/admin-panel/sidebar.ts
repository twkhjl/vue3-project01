import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {

  let isHidden=ref(true);
  let loading = ref(false);
  let hideWhenClick=ref(true);



  function isSidebarHidden() {
    return isHidden.value;
  }
  function isSidebarHiddenWhenClick() {
    return hideWhenClick.value;
  }
  function toggleSidebar(){
    isHidden.value=!isHidden.value;
  }
  function showSidebar(){
    isHidden.value=false;
  }
  function hideSidebar(){
    isHidden.value=true;
  }
  
  function toggleSidebarHideWhenClick(){
    hideWhenClick.value=!hideWhenClick.value;
  }
  function HideSidebarWhenClick(){
    hideWhenClick.value=true;
  }
  function KeepSidebarWhenClick(){
    hideWhenClick.value=false;
  }

  

  return {
    isSidebarHidden,
    isSidebarHiddenWhenClick,

    toggleSidebar,
    showSidebar,
    hideSidebar,
    
    toggleSidebarHideWhenClick,
    HideSidebarWhenClick,
    KeepSidebarWhenClick,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTopNavStore = defineStore('topnav', () => {

  let isHidden=ref(true);



  function isTopNavSubMenuHidden() {
    return isHidden.value;
  }
  function toggleSubMenuStatus(){
    isHidden.value=!isHidden.value;
  }
  function hideSubMenu(){
    isHidden.value=true;
  }
  function showSubMenu(){
    isHidden.value=false;
  }
 
  

  return {
    isTopNavSubMenuHidden,
    toggleSubMenuStatus,
    hideSubMenu,
    showSubMenu,
  }
})

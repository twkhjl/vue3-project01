import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStorageStore = defineStore('storage', () => {

  const ADMIN_LOCAL_STORAGE = 'admin_auth';

  function getAdmin(){
    return JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE));
  }

  function saveAdmin(data:any){
    data=JSON.stringify(data);
    localStorage.setItem(ADMIN_LOCAL_STORAGE,data);
  }

  function removeAdmin(){
    localStorage.removeItem(ADMIN_LOCAL_STORAGE);
  }

  function isAdminLoggedIn(){
    let data;
    data = localStorage.getItem(ADMIN_LOCAL_STORAGE);
    if(data){
      return data;
    }
    return false;
  }

  return {
    getAdmin,
    saveAdmin,
    removeAdmin,
    isAdminLoggedIn,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStorageStore = defineStore('storage', () => {

  const TOKEN_LOCAL_STORAGE = 'admin_token';
  const ADMIN_LOCAL_STORAGE = 'admin_data';

  function getToken(){
    return JSON.parse(localStorage.getItem(TOKEN_LOCAL_STORAGE));
  }

  function getAdmin(){
    return JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE));
  }

  function saveAdmin(data:any){
    data=JSON.stringify(data);
    let token = data.token;
    let admin_data=JSON.stringify(data.user);
    localStorage.setItem(TOKEN_LOCAL_STORAGE,token);
    localStorage.setItem(ADMIN_LOCAL_STORAGE,admin_data);
  }

  function removeAdmin(){
    localStorage.removeItem(TOKEN_LOCAL_STORAGE);
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

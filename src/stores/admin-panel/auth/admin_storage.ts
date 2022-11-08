import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import router from '@/router';
import ajax from '../../../helpers/ajax'

export const useStorageStore = defineStore('admin_storage', () => {

  const TOKEN_STORAGE_NAME = import.meta.env.VITE_TOKEN_STORAGE_NAME;
  const ADMIN_STORAGE_NAME = import.meta.env.VITE_ADMIN_STORAGE_NAME;


  let _rememberMe = ref(false);

  function setAsRememberMe() {
    _rememberMe.value = true;
  }
  function setAsDontRememberMe() {
    _rememberMe.value = false;
  }
  function isRememberMe() {
    return _rememberMe.value;
  }

  //admin data saved in local 
  function getAdmin() {

    let admin = localStorage.getItem(ADMIN_STORAGE_NAME)!==null?
    localStorage.getItem(ADMIN_STORAGE_NAME):
    sessionStorage.getItem(ADMIN_STORAGE_NAME);

    return JSON.parse(admin || "null");

  }
  function saveAdmin(data: any, rememberMe: boolean) {
    let adminData = JSON.stringify(data || "");
    if (rememberMe) {
      return localStorage.setItem(ADMIN_STORAGE_NAME, adminData);
    }
    return sessionStorage.setItem(ADMIN_STORAGE_NAME, adminData);

  }
  function removeAdmin() {

    localStorage.removeItem(ADMIN_STORAGE_NAME);
    sessionStorage.removeItem(ADMIN_STORAGE_NAME);
    return;


  }

  //jwt token saved in local 
  function getToken() {

    let token = localStorage.getItem(TOKEN_STORAGE_NAME)!==null?
    localStorage.getItem(TOKEN_STORAGE_NAME):
    sessionStorage.getItem(TOKEN_STORAGE_NAME);

    return token;


  }
  function saveToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
      return localStorage.setItem(TOKEN_STORAGE_NAME, token);
    }
    return sessionStorage.setItem(TOKEN_STORAGE_NAME, token);

  }
  function removeToken() {

    localStorage.removeItem(TOKEN_STORAGE_NAME);
    sessionStorage.removeItem(TOKEN_STORAGE_NAME);

  }


  return {
    setAsRememberMe, setAsDontRememberMe, isRememberMe,
    getAdmin, saveAdmin, removeAdmin,
    getToken, saveToken, removeToken,

  }
})

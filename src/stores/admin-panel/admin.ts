import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import router from '@/router';
import ajax from '../../helpers/ajax'

export const useAdminStore = defineStore('admin', () => {

  const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_ADMIN_URL;
  const API_REFRESH_URL = API_ROOT_URL + import.meta.env.VITE_API_ADMIN_REFRESH_URL;
  const API_ME_URL = API_ROOT_URL + import.meta.env.VITE_API_ADMIN_ME_URL;

  const TOKEN_STORAGE_NAME = import.meta.env.VITE_TOKEN_STORAGE_NAME;
  const ADMIN_STORAGE_NAME = import.meta.env.VITE_ADMIN_STORAGE_NAME;
  
  const ADMIN_LOGIN_ROUTER = 'admin.login';
  const ADMIN_HOME_ROUTER = 'admin.main';


  let _isLoggedIn = ref(false);
  let _loading = ref(false);
  let is_token_auto_refresh = ref(false);
  let _remember_me = ref(false);

  // loading state
  function isLoading() {
    return _loading.value;
  }
  function startLoading() {
    _loading.value = true;
  }
  function stopLoading() {
    _loading.value = false;
  }
  //remember_me state
  function set_remember_me_state(val: boolean) {
    _remember_me.value = val;
  }

  function check_and_set_remember_me() {

    if (
      localStorage.getItem(ADMIN_STORAGE_NAME) &&
      localStorage.getItem(TOKEN_STORAGE_NAME)
    ) { 
      return set_remember_me_state(true); 
      
    }
    return set_remember_me_state(false); 

  }

  //log in state
  function isAdminLoggedIn() {

    return _isLoggedIn.value;
  }
  function setAsLoggedIn() {
    _isLoggedIn.value = true;
  }
  function setAsNotLoggedIn() {
    _isLoggedIn.value = false;
  }

  //admin data saved in local 
  function getAdmin() {

    if (_remember_me.value) {
      return JSON.parse(localStorage.getItem(ADMIN_STORAGE_NAME)|| "") ;
    }
    return JSON.parse(sessionStorage.getItem(ADMIN_STORAGE_NAME)|| "") ;

  }
  function saveAdmin(data: any) {
    let admin_data = JSON.stringify(data);

    if (_remember_me.value) {
      return localStorage.setItem(ADMIN_STORAGE_NAME, admin_data);
    }
    return sessionStorage.setItem(ADMIN_STORAGE_NAME, admin_data);

  }
  function removeAdmin() {

    if (_remember_me.value) {
      return localStorage.removeItem(ADMIN_STORAGE_NAME);
    }
    return sessionStorage.removeItem(ADMIN_STORAGE_NAME);


  }

  //jwt token saved in local 
  function getToken() {
    if (_remember_me.value) {
      return localStorage.getItem(TOKEN_STORAGE_NAME) || "";
    }
    return sessionStorage.getItem(TOKEN_STORAGE_NAME) || "";
  }
  function saveToken(token: string) {
    if (_remember_me.value) {
      return localStorage.setItem(TOKEN_STORAGE_NAME, token);
    }
    return sessionStorage.setItem(TOKEN_STORAGE_NAME, token);

  }
  function removeToken() {
    if (_remember_me.value) {
      return localStorage.removeItem(TOKEN_STORAGE_NAME);
    }
    return sessionStorage.removeItem(TOKEN_STORAGE_NAME);

  }
  async function refreshToken() {
    ajax.setTokenToHeader(getToken());
    return await ajax.postData(API_REFRESH_URL);
  }

  interface RouterObject {
    name: string
  }
  async function validataAdminState(redirect?: boolean) {
    redirect = redirect || true;
    
    check_and_set_remember_me();
    let token = getToken();
    let admin_data = getAdmin();
    
    
    // private function
    // =========================================
    function private_setAsNotLoggedInAndRedirect() {
      setAsNotLoggedIn();
      if (redirect) redirectToLoginRoute({name:ADMIN_LOGIN_ROUTER});
    }
    function private_setAsLoggedInAndRedirect() {
      setAsLoggedIn();
      if (redirect) redirectToLoginRoute({name:ADMIN_HOME_ROUTER});
    }
    // =========================================
    //end private function


    if (!token || !admin_data) {
      removeToken();
      removeAdmin();
      private_setAsNotLoggedInAndRedirect();
      return;
    }
    
    ajax.setTokenToHeader(token);
    let result:any = await ajax.postData(API_ME_URL);
    result = await result.json();
    
    //redirect logged in user in login page to main page
    if (result && !result.error && router.currentRoute.value.name==ADMIN_LOGIN_ROUTER) {
      private_setAsLoggedInAndRedirect();
      return;
    }

    if (result.error && result.error !== 'expire') {
      removeToken();
      removeAdmin();
      private_setAsNotLoggedInAndRedirect();
      return;
    }
    if (result.error && result.error == 'expire') {

      if (!is_token_auto_refresh.value) {
        removeToken();
        removeAdmin();
        private_setAsNotLoggedInAndRedirect();
        return;
      }

      // refresh token
      let result:any = await refreshToken();
      result = await result.json();

      if (result.error || !result.access_token) {
        removeToken();
        removeAdmin();
        private_setAsNotLoggedInAndRedirect();
        return;
      }

      saveToken(result.access_token);
      setAsLoggedIn();
      ajax.setTokenToHeader(getToken());

    }

  }

  function redirectToLoginRoute(login_url: RouterObject = { name: ADMIN_LOGIN_ROUTER }) {
    router.push(login_url);
  }

  async function login(user: any, url_obj?: any) {


    let url = 'login';
    let data:any = await ajax.postData(API_ROOT_URL + url, user);
    data = await data.json();
    
    if (data.error || !data.user || !data.token) {
      return data;
    }

    saveToken(data.token);
    saveAdmin(data.user);
    setAsLoggedIn();
    


    if (url_obj && url_obj.name) {
      router.push(url_obj);
    }
    return data;
  }
  async function logout(url_obj?: RouterObject) {
    let token = getToken();

    if (!token) {
      removeAdmin();
      removeToken();
      if (url_obj && url_obj.name) {
        router.push(url_obj);
      }
      return { error: 'blank', message: 'token does not exist' };
    }
    ajax.setTokenToHeader(token);
    let url = 'logout';

    let data:any = await ajax.postData(API_ROOT_URL + url);
    data = await data.json();
    if (!data.error) {
      removeAdmin();
      removeToken();
      _isLoggedIn.value = false;
    };
    if (url_obj && url_obj.name) {
      router.push(url_obj);
    }
    return data;
  }



  return {
    isAdminLoggedIn, validataAdminState, redirectToLoginRoute,
    isLoading, startLoading, stopLoading,
    getAdmin, saveAdmin, removeAdmin,

    getToken, saveToken, removeToken,
    refreshToken,

    set_remember_me_state,

    login,
    logout,
  }
})

import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'

export const useAdminStore = defineStore('admin', () => {

  let _isLoggedIn = ref(false);
  let _loading = ref(false);
  const API_URL = 'https://vue3-project01-api.twkhjl-test.duckdns.org/api/admin/';

  let headers = new Headers({
    'content-type': 'application/json',
    'Accept': 'application/json',
  });

  const TOKEN_LOCAL_STORAGE = 'admin_token';
  const ADMIN_LOCAL_STORAGE = 'admin_data';

  function isLoading() {
    return _loading.value;
  }
  function startLoading() {
    _loading.value = true;
  }
  function stopLoading() {
    _loading.value = false;
  }
  function getToken() {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE) || "";
  }

  function getAdmin() {
    return JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORAGE)) || "";
  }

  function saveAdmin(data: any) {
    let token = data.token;
    let admin_data = JSON.stringify(data.user);
    localStorage.setItem(TOKEN_LOCAL_STORAGE, token);
    localStorage.setItem(ADMIN_LOCAL_STORAGE, admin_data);
  }


  function removeAdmin() {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE);
    localStorage.removeItem(ADMIN_LOCAL_STORAGE);
  }

  async function isAdminLoggedIn() {
    let token = getToken();
    if (!token) {
      return false;
    }
    let url = API_URL + 'me';
    let data = await fetchData({ url, method: 'post',token });

    // if not authorized:
    // {message: 'Unauthenticated.'}


    let output = await data.json();
    output.status = await data.status;
    return output;
  }



  async function login(user: any) {

    let url = API_URL + 'login';
    let data = await fetchData({ url, method: 'post', data: user });

    data = await data.json();
    if (!data.error) {
      saveAdmin(data);
      _isLoggedIn.value = true;
    }
    return data;
  }

  async function logout() {
    let token = getToken();

    if (!token) {
      return { error: 'no token' };
    }

    let url = API_URL + 'logout';


    let data = await fetchData({ url, method: 'post', token });

    data = await data.json();
    if (!data.error) {
      removeAdmin();
      _isLoggedIn.value = false;
    };
    return data;
  }

  function fetchData(opt: object) {
    // url: string, method: string, data?: any, token?: any
    if (!opt.url) return { error: 'url required' };
    if (!opt.method) return { error: 'method required' };

    let headers = {
      'content-type': 'application/json',
      'Accept': 'application/json',
    };

    if (opt.token) {
      headers['Authorization'] = `Bearer ${opt.token}`;
    }

    return fetch(opt.url, {
      body: opt.data ? JSON.stringify(opt.data) : null,
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'include', // include, same-origin, *omit
      headers: headers,
      method: opt.method, // *GET, POST, PUT, DELETE, etc.
      referrer: 'no-referrer', // *client, no-referrer
    })
    // .then(response => response.json())
  }


  return {
    isLoading, startLoading, stopLoading,
    isAdminLoggedIn,
    getAdmin, getToken, saveAdmin,
    login,
    logout,
  }
})

import { ref, computed } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import router from '@/router';
import ajax from '../../helpers/ajax'

export const useAdminStore = defineStore('admin', () => {

  let _isLoggedIn = ref(false);
  let _loading = ref(false);
  const API_ROOT_URL = 'https://vue3-project01-api.twkhjl-test.duckdns.org/api/admin/';
  const TOKEN_STORAGE_NAME = 'admin_token';
  const ADMIN_STORAGE_NAME = 'admin_data';




  async function autoRefreshAdminToken() {
    await refreshTokenWhenExpired();
    ajax.setTokenToHeader(getToken());
  }

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
    return localStorage.getItem(TOKEN_STORAGE_NAME) || "";
  }
  function saveToken(token: string) {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
  }
  function removeToken() {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }
  async function checkToken() {
    let token = getToken();
    if (!token) {
      return { error: 'blank', message: 'token does not exist' };
    }
    let url = 'me';


    ajax.setTokenToHeader(getToken());
    let data = await ajax.postData(API_ROOT_URL + url);
    let output = await data.json();
    return output;

  }
  async function refreshToken() {
    let url = 'refresh';

    ajax.setTokenToHeader(getToken());
    let data = await ajax.postData(API_ROOT_URL + url);
    let output = await data.json();
    if (!output.error && output.access_token) {
      saveToken(output.access_token);
      ajax.setTokenToHeader(getToken());
    }
    return output;

  }
  async function refreshTokenWhenExpired() {
    let isExpired = await checkToken();
    if (isExpired.error !== 'expire') { return isExpired };

    let url = 'refresh';
    ajax.setTokenToHeader(getToken());
    let data = await ajax.postData(API_ROOT_URL + url);
    let output = await data.json();

    if (!output.error && output.access_token) {
      saveToken(output.access_token);
      ajax.setTokenToHeader(getToken());
    }
    return output;

  }

  function getAdmin() {
    return JSON.parse(localStorage.getItem(ADMIN_STORAGE_NAME)) || "";
  }
  function saveAdmin(data: any) {
    let admin_data = JSON.stringify(data);
    localStorage.setItem(ADMIN_STORAGE_NAME, admin_data);
  }
  function removeAdmin() {
    localStorage.removeItem(ADMIN_STORAGE_NAME);
  }
  async function isAdminLoggedIn() {
    let token = getToken();
    if (!token) {
      return false;
    }
    await refreshTokenWhenExpired();
    let url = 'me';
    let data = await ajax.postData(API_ROOT_URL + url);

    let output = await data.json();
    return output;
  }



  async function login(user: any, url_obj?: object) {

    let url = 'login';
    let data = await ajax.postData(API_ROOT_URL + url, user);
    data = await data.json();

    if (data.error || !data.user || !data.token) {
      return data;
    }

    saveToken(data.token);
    saveAdmin(data.user);
    _isLoggedIn.value = true;

    if (url_obj && url_obj.name) {
      router.push(url_obj);
    }
    return data;
  }

  async function logout(url_obj?: object) {
    let token = getToken();

    if (!token) {
      removeAdmin();
      removeToken();
      return { error: 'blank', message: 'token does not exist' };
    }


    ajax.setTokenToHeader(token);
    let url = 'logout';

    let data = await ajax.postData(API_ROOT_URL + url);
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
    isLoading, startLoading, stopLoading,
    isAdminLoggedIn,
    getAdmin, saveAdmin, removeAdmin,

    getToken, saveToken, removeToken,
    checkToken, refreshToken, refreshTokenWhenExpired, autoRefreshAdminToken,

    login,
    logout,
  }
})

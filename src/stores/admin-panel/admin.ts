import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {

  let isAdminLoggedIn = ref(false);
  let loading = ref(false);
  const API_URL = 'https://vue3-project01-api.twkhjl-test.duckdns.org/api/user/';



  function isLoggedIn() {
    return isAdminLoggedIn.value;
  }

  async function login(user: any) {

    let url = API_URL + 'login';
    let data = await fetchData(url, 'post', user);
    data = await data.json();
    isAdminLoggedIn.value=true;
    return data;
  }

  async function logout(token:any) {
    let url = API_URL + 'logout';

    let data = await fetch(url,{
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      
      headers: new Headers({
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
      }),
      method: 'post', // *GET, POST, PUT, DELETE, etc.
      referrer: 'no-referrer', // *client, no-referrer
    });

    data = await data.json();
    if(!data.error){ isAdminLoggedIn.value=false;};
    return data;
  }

  function fetchData(url: string, method: string, data?: any,token?:any) {

    
    return fetch(url,{
      body: data ? JSON.stringify(data) : null,
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      
      // credentials: 'include', // include, same-origin, *omit
      headers: new Headers({
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization':`${token}`,
      }),
      method: method, // *GET, POST, PUT, DELETE, etc.
      referrer: 'no-referrer', // *client, no-referrer
    })
    // .then(response => response.json())
  }


  return {
    isLoggedIn,
    login,
    logout,
    loading,
  }
})

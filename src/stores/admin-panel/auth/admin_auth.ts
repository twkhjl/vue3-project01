import { ref } from 'vue'
import { defineStore, setActivePinia } from 'pinia'
import { useFetchData } from '@/helpers/fetchData'
import { useStorageStore } from './admin_storage'

export const useAuthStore = defineStore('admin_auth', () => {

  const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL + import.meta.env.VITE_API_ADMIN_URL;
  const API_REFRESH_URL = API_ROOT_URL + import.meta.env.VITE_API_ADMIN_REFRESH_URL;
  const API_ME_URL = API_ROOT_URL + import.meta.env.VITE_API_ADMIN_ME_URL;

  const storage = useStorageStore();
  const fetchData = useFetchData();

  const _isAdminLoggedIn=ref(false);

  const isTokenAutoRefresh = ref(false);
  const isTokenExpired = ref(false);
  const isTokenInvalid = ref(true);

  async function isAuthenticated() {

    let token: any = storage.getToken();
    let admin: any = storage.getAdmin();
    let result: any;


    if (!token || !admin) {
      setAsNotLoggedIn();
      return false;
    }

    fetchData.setTokenToHeader(token);
    result = await fetchData.postData(API_ME_URL);

    // -------------------------------------------

    if (result.error) {

      if (result.error !== 'expire') {
        console.log('token expired');
        setAsNotLoggedIn();
        return false;
      }
      if (!isTokenAutoRefresh.value){ 
        setAsNotLoggedIn();
        return false;
      }

      try {
        let expiredToken = token;
        let result: any = refreshToken(expiredToken);
        if (result.error) {
          setAsNotLoggedIn();
          return false;
        }

        setAsLoggedIn();
        return true;
      } catch (error) { 
        
        setAsNotLoggedIn();
        return false; 

      }
    }

    if (result.role && result.role === 'admin' && result.name &&
    admin.role === result.role &&
    admin.name === result.name
    ) {
      setAsLoggedIn();
      return true;
    }
    setAsNotLoggedIn();
    return false;


  }
  async function refreshToken(token: string) {
    fetchData.setTokenToHeader(token);
    return await fetchData.postData(API_REFRESH_URL);
  }
  async function login(user: any) {
    let url = 'login';
    let data: any = await fetchData.postData(API_ROOT_URL + url, user);
    setAsLoggedIn();
    return data;
  }
  async function logout() {
    setAsNotLoggedIn();
    let token = storage.getToken();
    if (!token) {
      return false;
    }
    fetchData.setTokenToHeader(token);
    let url = 'logout';
    let data: any = await fetchData.postData(API_ROOT_URL + url);
    return data;

  }
  function setAsLoggedIn(){
    _isAdminLoggedIn.value=true;
  }
  function setAsNotLoggedIn(){
    _isAdminLoggedIn.value=false;
  }
  function isLoggedIn(){
    return _isAdminLoggedIn.value;
  }




  return {
    isAuthenticated, refreshToken,
    login, logout,
    isLoggedIn,setAsLoggedIn,setAsNotLoggedIn,
  }
})

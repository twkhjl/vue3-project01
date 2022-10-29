<script setup lang="ts">
import router from '@/router';
import { ref, onBeforeMount, computed, watch, onMounted } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin';
import { useStorageStore } from '../../stores/admin-panel/storage';

const adminStore = useAdminStore();
const storageStore = useStorageStore();

let name = ref(null);
let password = ref(null);
let isValid=ref(true);
let err_msg=ref('');
const err_msg_arr={
  err:'帳號或密碼錯誤',
  server:'系統異常,請聯絡管理員處理',
};


function isLoading(){
  return adminStore.isLoading();
}

onMounted(async () => {
  
 

})

async function login() {
  let user = {
    name: name.value,
    password: password.value,
  }
  adminStore.startLoading();
  let url_obj={name:'admin.main'};
  let result = await adminStore.login(user,{name:'admin.main'});
  
  adminStore.stopLoading();

  if(result.error){
    err_msg.value=err_msg_arr.err;
    return isValid.value=false;
  }
  if(!result.user || !result.token){
    err_msg.value=err_msg_arr.server;
    return isValid.value=false;
  }

  adminStore.saveAdmin(result.user);
  adminStore.saveToken(result.token);
  isValid.value=true;

  // router.push({name:'admin.main'});
}



</script>


<template>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />

  <div class="flex flex-col w-[100vw] h-[100vh] justify-center items-center">

    <div class=" bg-gray-100 rounded-md shadow-md shadow-black border-t-[1px] relative">
      <div class="absolute z-10  bg-yellow-200 shadow-md shadow-yellow-700
    top-[-17%] left-0 right-0
    w-[120px] h-[120px] rounded-[100%] mx-auto text-center flex justify-center">
        <div class="leading-[120px] text-[60px]">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
      <form class="relative flex flex-col
  w-[70vw] h-auto px-6 
  md:w-[40vw]">
        <div class="text-4xl text-center mt-16 mb-4">後台登入</div>
        <div v-if="!isValid" class="text-xl text-red-400">{{ err_msg }}</div>

        <input v-model="name" 
@keyup="isValid=true"
        class="outline-none 
    border-2 border-gray-300 
    w-full h-[40px] rounded-md px-2 mb-4" type="text" placeholder="帳號">
        <input v-model="password" @keyup="isValid=true"
        class="outline-none 
    border-2 border-gray-300 
    w-full h-[40px] rounded-md px-2 mb-4" type="password" placeholder="密碼">
      
    <template v-if="isLoading()">
        <span class="outline-none 
        border-2 border-gray-300 bg-slate-400 text-black text-2xl
        w-full h-[7vh] rounded-md px-2 mt-10 text-center leading-[7vh] ">
        <i class="animate-spin mr-2 fa-solid fa-arrows-spin "></i>請稍候...</span>
      </template>
      <template v-else>
        <button @click.prevent="login()" class="outline-none hover:bg-slate-400
        border-2 border-gray-300 bg-slate-600  text-white text-2xl
        w-full h-[7vh] rounded-md px-2 mt-10">登入</button>
      </template>

      </form>

      <div class="text-center bg-gray-400 rounded-sm mt-4 leading-[10vh] h-[9vh] text-lg">忘記密碼?</div>

    </div>

  </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref, computed, watch,onMounted } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin.js';

const adminStore = useAdminStore();

let name = ref(null);
let password = ref(null);
let remember_me=ref(false);
let isValid=ref(true);
let err_msg=ref('');


const err_msg_arr={
  err:'帳號或密碼錯誤',
  server:'系統異常,請聯絡管理員處理',
};


onMounted(()=>{
})

function isLoading(){
  return adminStore.isLoading();
}


async function login() {
  
  adminStore.set_remember_me_state(remember_me.value);

  let user = {
    name: name.value,
    password: password.value,
  }
  adminStore.startLoading();
  let url_obj={name:'admin.main'};
  let result:any = await adminStore.login(user,{name:'admin.main'});
  
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

}



</script>


<template>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />

  <div class="flex flex-col w-[100vw] h-[100vh] justify-center items-center">

    <div class=" bg-gray-100 rounded-md shadow-md shadow-black border-t-[1px] relative">
      <div class="absolute z-10  bg-teal-700 text-white
    top-[-17%] left-0 right-0
    w-[120px] h-[120px] rounded-[100%] mx-auto text-center flex justify-center">
        <div class="leading-[120px] text-[60px]">
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
      <form class="relative flex flex-col
  w-[70vw] h-auto px-6 pb-6
  md:w-[35vw]">
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

    <!-- checkbox -->
    <label class="relative flex items-center ml-0 mx-auto w-auto">
  <input type="checkbox" v-model="remember_me"
  class="peer absolute left-0 h-0 w-0" />
  <span class="relative 
  block
  h-[35px] w-[35px]
   rounded-sm border-4 border-green-700
  hover:bg-green-200
  peer-checked:bg-green-200
  transition-all duration-200
  after:top-4 after:left-3
  after:absolute
  after:h-[0px] after:w-[0px] 
  after:rotate-[225deg] 
  after:border-t-[0px] after:border-l-[0px] 
  after:border-t-green-700 after:border-l-green-700
  
  peer-checked:after:h-[15px]
  peer-checked:after:w-[12px]
  peer-checked:after:border-t-[4px]
  peer-checked:after:border-l-[4px]
  peer-checked:after:top-1
  peer-checked:after:left-2
  after:transition-all after:duration-200
  
  "></span>
  <div class="ml-2 relative transition-all duration-150
  after:w-0 
  after:transition-all after:duration-150
  after:absolute after:bottom-0 after:left-0
  after:border-b-2 after:border-b-green-500
  peer-checked:after:w-full
  peer-checked:font-extrabold

   ">記住我</div>
</label>

      
    <template v-if="isLoading()">
        <span class="outline-none 
        border-2 border-gray-300 bg-teal-400 text-black text-2xl
        w-full h-[7vh] rounded-md px-2 mt-7 text-center leading-[7vh] ">
        <i class="animate-spin mr-2 fa-solid fa-arrows-spin "></i>請稍候...</span>
      </template>
      <template v-else>
        <button @click.prevent="login()" class="outline-none hover:bg-teal-500
         bg-teal-600  text-white text-2xl
        w-full h-[7vh] rounded-md px-2 mt-7">登入</button>
      </template>

      </form>

    </div>

  </div>
</template>
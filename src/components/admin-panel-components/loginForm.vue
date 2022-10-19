<script setup lang="ts">
import router from '@/router';
import { ref, onMounted, computed, watch } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin';
import { useStorageStore } from '../../stores/admin-panel/storage';

const adminStore = useAdminStore();
const storageStore = useStorageStore();

let name = ref(null);
let password = ref(null);
let isValid=ref(true);
onMounted(() => {

  if(adminStore.isLoggedIn()){
    router.push({name:'main'});
  }

})

async function login() {
  let user = {
    name: name.value,
    password: password.value,
  }

  let result = await adminStore.login(user);
  

  if(result.error){
    return isValid.value=false;
  }

  storageStore.saveAdmin(result);
  isValid.value=true;

  router.push({name:'main'});
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
        <div v-if="!isValid" class="text-xl text-red-400">*帳號或密碼錯誤</div>
        <input v-model="name" class="outline-none 
    border-2 border-gray-300 
    w-full h-[40px] rounded-md px-2 mb-4" type="text" placeholder="帳號">
        <input v-model="password" class="outline-none 
    border-2 border-gray-300 
    w-full h-[40px] rounded-md px-2 mb-4" type="password" placeholder="密碼">
        <button @click.prevent="login()" class="outline-none hover:bg-slate-400
    border-2 border-gray-300 bg-slate-600  text-white text-2xl
    w-full h-[7vh] rounded-md px-2 mt-10">登入</button>
      </form>

      <div class="text-center bg-gray-400 rounded-sm mt-4 leading-[10vh] h-[9vh] text-lg">忘記密碼?</div>

    </div>

  </div>
</template>
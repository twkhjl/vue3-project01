<script setup lang="ts">
import router from '@/router';
import { ref, onBeforeMount, computed, watch } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin';

const adminStore = useAdminStore();

function create(){

  console.log('create');
}

</script>


<template>


  <div class="flex flex-col w-full md:w-[80vw] h-[90vh] justify-center items-center">

    <div class=" bg-gray-100 rounded-md shadow-md shadow-black border-t-[1px] relative">
     
      <form class="relative flex flex-col
  w-[70vw] h-auto px-6 
  md:w-[40vw]">
        <div class="text-4xl text-center mt-16 mb-4">創建分類</div>

        <input
        class="outline-none 
    border-2 border-gray-300 
    w-full h-[40px] rounded-md px-2 mb-4" type="text" placeholder="分類名稱">
      
    <template>
        <span class="outline-none 
        border-2 border-gray-300 bg-slate-300  text-white text-2xl
        w-full h-[7vh] rounded-md px-2 mt-10 text-center leading-[7vh]">
        <i class="animate-spin mr-2 fa-solid fa-arrows-spin"></i>請稍候...</span>
      </template>
        <button @click.prevent="create()" class="outline-none hover:bg-slate-400
        border-2 border-gray-300 bg-slate-600  text-white text-2xl
        w-full h-[7vh] rounded-md px-2 mt-10">登入</button>
      </form>

    </div>

  </div>
</template>
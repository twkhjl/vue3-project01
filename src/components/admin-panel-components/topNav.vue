<script setup lang="ts">
import { useSidebarStore } from '../../stores/admin-panel/sidebar';
const sidebarStore = useSidebarStore();

function toggleSidebar(){
  return sidebarStore.toggleSidebar();
}

</script>


<template>
<div class="top-nav 
  sticky top-0 h-[10vh] w-full 
  px-4
  bg-gray-400 shadow-md shadow-black
  flex justify-start items-center">
    <div @click="toggleSidebar()"
    class="">
      <i class="fa-solid fa-bars text-2xl"></i>
    </div>
    <div class="relative mr-0 mx-auto">
      <span class="mr-2">歡迎,aaa</span>
      <i class="fa-solid fa-user text-2xl"></i>
      <div class="dropdown hidden
      absolute right-1 top-[7vh]
      min-w-[70vw] sm:min-w-[25vw] w-auto h-auto bg-[#e9e6e8]
      ">
      <div class="border-b-gray-400 border-2 text-gray-400 text-xl">選單</div>
      <div class="droppdown-item ml-2 my-2 text-lg">
        <i class="fa-solid fa-sliders"></i>
        <span class="ml-[0.4rem]">個人資料</span></div>
      <div class="droppdown-item ml-2 my-2 text-lg">
        <i class="fa-solid fa-key"></i>
        <span class="ml-[0.4rem]">變更密碼</span></div>
      <div class="droppdown-item ml-2 my-2 text-lg">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span class="ml-1">登出</span></div>
      </div>
    </div>
  </div>
</template>

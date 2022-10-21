<script setup lang="ts">
import { watch,ref } from 'vue';
import { useSidebarStore } from '../../stores/admin-panel/sidebar';

const sidebarStore = useSidebarStore();



</script>


<template>
    <div 
    :class="[sidebarStore.isSidebarHidden()?'hidden':'']"
    @click="sidebarStore.toggleSidebar()"
    class="fixed h-full w-full bg-black opacity-[0.5]"></div>

    <div 
    :class="[sidebarStore.isSidebarHidden()?'w-[0vw]':'w-[50vw]']"
    class="sidebar  overflow-hidden
      fixed left-0 z-30
      h-[100vh]
      transition-all duration-250
      bg-gray-700 shadow-md shadow-black">
      <div class="sidebar-title
      text-white text-2xl text-center py-4
      border-b-gray-500 border-b-2">
      <i class="fa-solid fa-computer"></i>
      <span class="ml-4">Admin Panel</span>
      </div>
      <div class="sidebar-item 
      text-xl flex text-white py-2">
        <span class="mx-2"><i class="fa-solid fa-users"></i></span>
         <!-- <span class="">用戶管理</span> -->
        <RouterLink :to="{name:'main'}">用戶管理</RouterLink>
        <span class="mr-4 mx-auto">
          <i class="fa-solid fa-angle-left"></i>
        </span>
      </div>
      <div class="sidebar-item 
      text-xl flex text-white py-2">
        <span class="mx-2"><i class="fa-solid fa-gift"></i></span>
         <!-- <span>產品管理</span> -->
        <RouterLink to="/admin/ttt">產品管理</RouterLink>
    
        <span class="mr-4 mx-auto">
          <i class="fa-solid fa-angle-left"></i>
        </span>
      </div>
    
      </div>

</template>

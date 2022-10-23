<script setup lang="ts">
import { watch, ref, onMounted, onBeforeMount } from 'vue';
import { useSidebarStore } from '../../stores/admin-panel/sidebar';
import { useAdminStore } from '../../stores/admin-panel/admin';
import { useBreakPointStore } from '../../stores/common/breakpoint';

import SidebarItem from './sidebarItem.vue';
import { useWindowSize } from '@vueuse/core'
import router from "@/router";



const { width, height } = useWindowSize();
const sidebarStore = useSidebarStore();
const breakpointStore = useBreakPointStore();
const adminStore=useAdminStore();

onBeforeMount(async () => {

  let data = await adminStore.isAdminLoggedIn();
  if(!data || data.status==401){
    router.push({name:'admin.login'});
  }

})

onMounted(async () => {
  // let data = await adminStore.isAdminLoggedIn();
  if (width.value >= breakpointStore.md) {
    sidebarStore.KeepSidebarWhenClick();
  }
  sidebarStore.HideSidebarWhenClick();


})

watch(width, (newVal, oldVal) => {
  if (newVal >= breakpointStore.md) {
    sidebarStore.KeepSidebarWhenClick();
  }
  sidebarStore.HideSidebarWhenClick();

})


const sidebarItemData = [
  {
    name: 'item1', icon: 'fa-solid fa-users',
    children: [
      { name: 'item1-1', icon: 'fa-solid fa-users', link: { name: 'main' } },
      { name: 'item1-2', icon: 'fa-solid fa-check', link: { name: 'ttt' } },
      { name: 'item1-3', icon: 'fa-solid fa-users', link: { name: 'main' } },
    ]
  },
  {
    name: 'item2', icon: 'fa-solid fa-users',
    children: [
      { name: 'item2-1', icon: 'fa-solid fa-users', link: { name: 'main' } },
      { name: 'item2-2', icon: 'fa-solid fa-users', link: { name: 'main' } },
    ]
  }

]
  ;


</script>


<template>
  <div :class="[sidebarStore.isSidebarHidden()?'hidden':'']" @click="sidebarStore.toggleSidebar()"
    class="fixed h-full w-full bg-black opacity-[0.5] md:hidden"></div>

  <div :class="[sidebarStore.isSidebarHidden()?'w-[0vw]':'w-[50vw]']" class="sidebar  overflow-hidden
      fixed left-0 z-30
      h-[100vh]
      transition-all duration-250
      bg-gray-700 shadow-md shadow-black
      md:w-[20vw]">
    <div class="sidebar-title
      text-white text-2xl text-center py-4
      border-b-gray-500 border-b-2">
      <i class="fa-solid fa-computer"></i>
      <span class="ml-4">Admin Panel</span>
    </div>
    <div class="flex flex-col">
      <SidebarItem v-for="itemData in sidebarItemData" :itemData="itemData" />
    </div>

  </div>

</template>

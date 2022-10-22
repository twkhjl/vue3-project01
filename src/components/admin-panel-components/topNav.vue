<script setup lang="ts">
import { ref, watch } from "vue";
import { useSidebarStore } from '../../stores/admin-panel/sidebar';
import { useAdminStore } from '../../stores/admin-panel/admin';
import { useStorageStore } from "../../stores/admin-panel/storage";
import router from "@/router";

import { useRoute } from 'vue-router';


const sidebarStore = useSidebarStore();
const adminStore = useAdminStore();
const storageStore = useStorageStore();


function toggleSidebar() {
  return sidebarStore.toggleSidebar();
}

let currentMenu = ref(null);
let isMenuHidden = ref(true);

function toggleMenu(menu: string) {
  currentMenu.value = menu;
  isMenuHidden.value = !isMenuHidden.value;

}

async function logout() {
  console.log('start');
  let adminData = storageStore.getAdmin();
  let token = adminData.token;
  let result = await adminStore.logout(token);
  console.log(result);
  storageStore.removeAdmin();
  router.push({ name: 'admin-login' });
}

const route=useRoute();

watch(() => route.name, () => {
  // console.log(`MyCoolComponent - watch route.name changed to ${route.name}`);
  // Do something here...

  // Optionally you can set immediate: true config for the watcher to run on init
}, { immediate: true });

</script>


<template>
  <div class="top-nav 
  sticky top-0 h-[10vh] w-full 
  px-4
  bg-gray-400 shadow-md shadow-black
  flex justify-start items-center">
    <div @click="toggleSidebar()" class="">
      <i class="fa-solid fa-bars text-2xl"></i>
    </div>
    <div class="relative mr-0 mx-auto">
      <span class="mr-2">歡迎,aaa</span>
      <i @click="toggleMenu('user')" class="fa-solid fa-user text-2xl"></i>
      <div :class="[currentMenu=='user' && isMenuHidden==false?'':'hidden']" class="dropdown
      absolute right-1 top-[7vh]
      min-w-[70vw] sm:min-w-[25vw] w-auto h-auto bg-[#e9e6e8]
      ">
        <div class="border-b-gray-400 border-2 text-gray-400 text-xl">選單</div>
        <div class="droppdown-item ml-2 my-2 text-lg">
          <i class="fa-solid fa-sliders"></i>
          <span class="ml-[0.4rem]">個人資料</span>
        </div>
        <div class="droppdown-item ml-2 my-2 text-lg">
          <i class="fa-solid fa-key"></i>
          <span class="ml-[0.4rem]">變更密碼</span>
        </div>
        <div @click="logout()" class="droppdown-item ml-2 my-2 text-lg">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span class="ml-1">登出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSidebarStore } from '../../stores/admin-panel/sidebar.js';
import { useTopNavStore } from "../../stores/admin-panel/topnav.js";
import { useAuthStore as useAdminAuthStore } from "@/stores/admin-panel/auth/admin_auth";
import { useStorageStore } from "@/stores/admin-panel/auth/admin_storage";

import router from "@/router";

const sidebarStore = useSidebarStore();
const topNavStore = useTopNavStore();

const auth = useAdminAuthStore();
const storage = useStorageStore();


const userSubMenu=ref(null);

function toggleSidebar() {
  return sidebarStore.toggleSidebar();
}

const currentMenu = ref();


function toggleMenu(menu: string) {


  if(currentMenu.value==menu){

    topNavStore.toggleSubMenuStatus();

  }else{
    currentMenu.value = menu;
    topNavStore.showSubMenu();
  }

}


async function logout() {
  
  await auth.logout();
  storage.removeAdmin();
  storage.removeToken();

  router.push({ name: 'admin.login' });
}



</script>


<template>
  <div class="top-nav 
  sticky top-0 h-[10vh] w-full z-10
  px-4
  bg-gray-400 shadow-md shadow-black 
  flex justify-start items-center
  md:ml-[20vw] md:w-[80vw] md:mx-auto">
    <div @click="toggleSidebar()" class="">
      <i class="fa-solid fa-bars text-2xl md:hidden"></i>
    </div>


    <div class="relative mr-0 mx-auto">
      <span class="mr-2 cursor-pointer">歡迎,aaa</span>
      <i @click="toggleMenu('user')" class="fa-solid fa-user text-2xl cursor-pointer"></i>
      <div ref="userSubMenu" tabindex="0"

      :class="[currentMenu=='user' && !topNavStore.isTopNavSubMenuHidden()?'':'hidden']" class="dropdown
      absolute right-1 top-[7vh] shadow-md shadow-black
      min-w-[50vw] md:min-w-[15vw] w-auto h-auto bg-[#e9e6e8]
      ">
        <div class="border-b-gray-400 border-2 text-gray-400 text-xl">選單</div>
        <div class="droppdown-item ml-2 my-2 text-lg cursor-pointer">
          <i class="fa-solid fa-sliders"></i>
          <span class="ml-[0.4rem]">個人資料</span>
        </div>
        <div class="droppdown-item ml-2 my-2 text-lg cursor-pointer">
          <i class="fa-solid fa-key"></i>
          <span class="ml-[0.4rem]">變更密碼</span>
        </div>
        <div @click="logout()" class="droppdown-item ml-2 my-2 text-lg cursor-pointer">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span class="ml-1">登出</span>
        </div>
      </div>
    </div>

  </div>
</template>

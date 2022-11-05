<script setup lang="ts">
import { ref, watch } from "vue";
import { useSidebarStore } from '../../stores/admin-panel/sidebar';
import { useAdminStore } from '../../stores/admin-panel/admin';
import { useTopNavStore } from "../../stores/admin-panel/topnav";

import router from "@/router";
import { useRoute } from 'vue-router';



const sidebarStore = useSidebarStore();
const topNavStore = useTopNavStore();
const adminStore = useAdminStore();


const userSubMenu=ref(null);
const tttSubMenu=ref(null);



function toggleSidebar() {
  return sidebarStore.toggleSidebar();
}

let currentMenu = ref(null);

let isMenuHidden = ref(true);


let menus={
  'user':userSubMenu,
}

function toggleMenu(menu: string) {


  if(currentMenu.value==menu){

    topNavStore.toggleSubMenuStatus();

  }else{
    currentMenu.value = menu;
    topNavStore.showSubMenu();
  }

}

// watch(() => currentMenu.value, (newVal) => {
//   console.log(newVal);
// });

function onMenuFocus(menu:string){
  // console.log(menu);
}


async function logout() {
  let result = await adminStore.logout();
  router.push({ name: 'admin.login' });
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

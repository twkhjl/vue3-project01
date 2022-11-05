<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount,watch,ref } from 'vue';
import { useAdminStore } from '../../stores/admin-panel/admin.js';
import { useTopNavStore } from "../../stores/admin-panel/topnav.js";
import GlobalLoader from '../../components/admin-panel-components/global_loader.vue';
import GlobalModal from '@/components/admin-panel-components/global_modal.vue';

import TopNav from '../../components/admin-panel-components/topNav.vue';
import Sidebar from '../../components/admin-panel-components/sidebar.vue';
import { useGlobalLoaderStore } from '@/stores/admin-panel/global_loader.js';

const adminStore = useAdminStore();
const topNavStore = useTopNavStore();
const global_loader_store=useGlobalLoaderStore();

onBeforeMount(async() => {
  await adminStore.validataAdminState();

})


function hideTopNavMenu(){
  topNavStore.hideSubMenu();
}

</script>


<template>
  <GlobalModal></GlobalModal>
    <GlobalLoader></GlobalLoader>
    <div :class="global_loader_store.is_loading()?'hidden':'flex'"
    class="flex-col">
      <!-- topnav -->
      <TopNav></TopNav>
      <!-- sidebar -->
      <Sidebar></Sidebar>
      <div
      @click="hideTopNavMenu()"
      class="main min-h-[90vh] w-full bg-gray-300 
      md:ml-[20vw] md:w-[80vw]">
        <RouterView></RouterView>
      </div>
    </div>

  
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useAdminStore } from '../../stores/admin-panel/admin';
import { useTopNavStore } from "../../stores/admin-panel/topnav";

import TopNav from '../../components/admin-panel-components/topNav.vue';
import Sidebar from '../../components/admin-panel-components/sidebar.vue';

const adminStore = useAdminStore();
const topNavStore = useTopNavStore();


onBeforeMount(async() => {
  await adminStore.validataAdminState();

})


function hideTopNavMenu(){
  topNavStore.hideSubMenu();
}



</script>


<template>
<div class="flex flex-col">
  <!-- topnav -->
  <TopNav></TopNav>
  <!-- sidebar -->
  <Sidebar></Sidebar>
  <div
  @click="hideTopNavMenu()"
  class="main min-h-[120vh] w-full bg-gray-300 
  md:w-[80vw] md:ml-[20vw]">
    <RouterView></RouterView>
  </div>
</div>

  
</template>

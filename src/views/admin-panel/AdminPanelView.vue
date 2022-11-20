<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTopNavStore } from '../../stores/admin-panel/topnav.js'
import GlobalLoader from '../../components/admin-panel-components/global_loader.vue'
import GlobalModal from '@/components/admin-panel-components/global_modal.vue'

import TopNav from '../../components/admin-panel-components/topNav.vue'
import Sidebar from '../../components/admin-panel-components/sidebar.vue'
import { useGlobalLoaderStore } from '@/stores/admin-panel/global_loader.js'

const topNavStore = useTopNavStore()
const global_loader_store = useGlobalLoaderStore()

function hideTopNavMenu() {
  topNavStore.hideSubMenu()
}
</script>

<template>
  <GlobalModal></GlobalModal>
  <GlobalLoader></GlobalLoader>
  <div
    :class="global_loader_store.is_loading() ? 'hidden' : 'flex'"
    class="flex-col"
  >
    <!-- topnav -->
    <TopNav></TopNav>
    <!-- sidebar -->
    <Sidebar></Sidebar>
    <div
      class="main min-h-[90vh] w-full bg-gray-300 md:ml-[20vw] md:w-[80vw]"
      @click="hideTopNavMenu()"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>

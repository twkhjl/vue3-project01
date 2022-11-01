
<script setup lang="ts">
import {ref} from 'vue';
import {useGlobalLoaderStore} from '../../stores/admin-panel/global_loader';

const global_loader_store = useGlobalLoaderStore();


</script>


<template>
  <div :class="global_loader_store.is_loading()?['z-[100]']:['z-[-100]','opacity-0']"
   class=" fixed top-0 left-0  h-screen bg-gray-700
  transition-all duration-150">
    <div class="z-[110] relative flex justify-center items-center w-screen h-screen overflow-hidden">
      <div class="animate-bounce text-[20vh] text-gray-400 overflow-hidden">
        <i class="fa-solid fa-hourglass-half"></i>
      </div>
    </div>
  </div>
</template>
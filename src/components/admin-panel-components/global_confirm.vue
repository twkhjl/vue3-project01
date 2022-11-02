<script lang="ts" setup>
import { useGlobalModalStore } from '../../stores/admin-panel/global_modal';

const global_modal_store = useGlobalModalStore();

function hideModal(){
  global_modal_store.hide();
}

</script>

<template>
  <Transition name="fade">
  <div v-if="global_modal_store.is_show()"
  class="z-[100] fixed top-0 left-0 w-screen h-screen flex justify-center">
  <div class="relative mt-9 h-[50vh] w-[50vw] rounded-t-xl rounded-b-lg bg-gray-400 shadow-lg shadow-black">
    
    <div @click="hideModal()"
    class="absolute right-2 top-2 mx-auto mr-0 h-[2.5rem] w-[2.5rem] 
    rounded-full text-center text-2xl pt-1 bg-gray-400
    text-gray-700 hover:bg-gray-500 hover:text-white  shadow-md shadow-black cursor-pointer">
    <i class="fa-solid fa-xmark"></i>
    </div>

    <div class="h-[10vh] w-full rounded-t-lg bg-gray-700 text-white">
      <div class="h-full pl-4 text-2xl font-extrabold leading-[10vh]">confirm</div>
    </div>
    <div class="p-2">content</div>

  </div>
</div>
</Transition>

<div  v-if="global_modal_store.is_show()"
class="fixed top-0 left-0 z-[80] h-screen w-screen bg-black opacity-70"></div>
</template>



<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0,-100px);
}

.fade-leave-active {
}


</style>


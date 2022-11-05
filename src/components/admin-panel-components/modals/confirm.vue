<script lang="ts" setup>

import { useGlobalModalStore } from '@/stores/admin-panel/global_modal';
import { useGlobalLoadingState } from '@/stores/admin-panel/global_loading_state';

const global_modal_store=useGlobalModalStore();
const global_loading_state=useGlobalLoadingState();

function onClickConfirm(){
  global_modal_store.exec_confirm_callback_fn();
  global_modal_store.hide();
  return;
}
async function onAsyncClickConfirm(){
  await global_modal_store.exec_async_confirm_callback_fn();
  return;
}
function onClickCancel(){
  global_modal_store.hide();
  return;
}

</script>


<template>
  <div class="relative z-20 w-full rounded-t-xl rounded-b-lg bg-gray-400 
  border-4 border-red-700 
  shadow-lg shadow-black">
    
    <div class="p-2">
      <div class="flex flex-col items-center justify-center">
        <div class="text-[15vh] text-red-800">
        <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div class="text-4xl">{{ global_modal_store.get_content() }}</div>
        <div class="flex justify-evenly w-full my-6">
          
          <template v-if="!global_loading_state.is_loading()">
          <div @click="global_modal_store.is_confirm_callback_type_async()? onAsyncClickConfirm(): onClickConfirm()"
          class="px-2 py-2 rounded-lg bg-red-800 text-2xl text-white 
          shadow-sm shadow-black
          hover:bg-red-600 hover:cursor-pointer">
            <i class="fa-solid fa-check"></i> {{ global_modal_store.get_confirm_btn_text() }}
            </div>
          </template>
          <template v-else>
            <div
          class="px-2 py-2 rounded-lg bg-red-400 text-2xl text-white 
          shadow-sm shadow-black">
            <i class="fa-solid fa-hourglass-start animate-spin mr-2"></i>請稍候...
            </div>
          </template>
          
            <div @click="onClickCancel()"
             class="px-2 py-2 rounded-lg bg-gray-700 text-2xl text-white
          shadow-sm shadow-black
          hover:bg-gray-600 hover:cursor-pointer">
            <i class="fa-solid fa-xmark"></i> {{ global_modal_store.get_cancel_btn_text() }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
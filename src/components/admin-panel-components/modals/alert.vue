<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal';

const global_modal_store = useGlobalModalStore();


onMounted(() => {

  setTimeout(() => {
    global_modal_store.hide();
  }, 1500);

})

const x_data=ref(`{show:${global_modal_store.is_show()}}`);

const is_show = ref(`${global_modal_store.is_show()}`);

</script>

<template>
  <div 
  class="z-20 w-auto flex justify-center transition-all duration-200">
    <div class="relative z-20 w-full rounded-t-xl rounded-b-lg bg-gray-200 
  border-4 border-green-700 shadow-lg shadow-black">
      <div class="p-2">
        <div class="flex flex-col items-center justify-center">
          <div class="text-[15vh] text-green-800">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div class="text-4xl mb-4">{{ global_modal_store.get_content() }}</div>
        </div>
      </div>

    </div>
  </div>

</template>



<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import ajax from '../../helpers/ajax';
import { useAdminStore } from '../../stores/admin-panel/admin';

const props = defineProps(['category','idx']);

// onMounted(async () => {
//   const API_ROOT_URL = 'https://vue3-project01-api.twkhjl-test.duckdns.org/api/category/';
//   const adminStore = useAdminStore();

//   ajax.setTokenToHeader(adminStore.getToken());

// })

</script>

<template>
  <tr class="odd:bg-gray-200 border-b-2 border-black hover:bg-gray-300">
    <td class="border-r-2 border-r-black text-center">{{ idx }}</td>
    <td class="border-r-2 border-r-black px-2">{{ category.name }}</td>
    <td class="w-[20vw] text-xl mx-auto">
      <div class="flex justify-around">
        <button class="my-2 text-teal-700 hover:scale-125 transition-all duration-100">
          <i class="fa-solid fa-pen-to-square"></i>
          <span class="hidden sm:inline-block">編輯</span>
        </button>
        <button class="my-2 text-red-700 hover:scale-125 transition-all duration-100">
          <i class="fa-solid fa-xmark"></i>
          <span class="hidden sm:inline-block">刪除</span>
        </button>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal.js'

defineProps(['product', 'idx', 'store', 'data'])
const emits = defineEmits(['onRemoveEvent', 'onUpdateEvent'])

const modal = useGlobalModalStore()
</script>

<template>
  <tr class="odd:bg-gray-200 border-b-2 border-black hover:bg-gray-300">
    <td class="border-r-2 border-r-black text-center">{{ idx }}</td>
    <td class="border-r-2 border-r-black px-2">{{ product.name }}</td>
    <td class="border-r-2 border-r-black px-2">{{ product.description }}</td>
    <td class="border-r-2 border-r-black px-2">{{ product.price }}</td>
    <td class="border-r-2 border-r-black px-2">
      {{ product.units_in_stock || 0 }}
    </td>
    <td class="border-r-2 border-r-black px-2">
      {{ product.units_in_order || 0 }}
    </td>
    <td class="w-[20vw] text-xl mx-auto">
      <div class="flex justify-around">
        <button
          class="my-2 text-teal-700 hover:scale-125 transition-all duration-100"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span class="hidden sm:inline-block">編輯</span>
        </button>
        <button
          class="my-2 text-red-700 hover:scale-125 transition-all duration-100"
        >
          <i class="fa-solid fa-xmark"></i>
          <span class="hidden sm:inline-block">刪除</span>
        </button>
      </div>
    </td>
  </tr>
</template>

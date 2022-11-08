<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import ajax from '../../helpers/ajax';
import { useGlobalModalStore } from "@/stores/admin-panel/global_modal.js";


const props = defineProps(['category', 'idx', 'store', 'data']);
const emits = defineEmits(['onRemoveEvent']);

const global_modal_store = useGlobalModalStore();

function showRmoveItemConfirm(category_id: number){

  global_modal_store.use_confirm();
  global_modal_store.set_content('是否確認刪除此筆資料?');
  global_modal_store.set_confirm_btn_text('沒錯!');
  global_modal_store.set_cancel_btn_text('我再想想..');
  global_modal_store.set_confirm_callback_fn(removeItem,category_id);
  global_modal_store.set_confirm_callback_type_async();
  global_modal_store.toggle();
}

async function removeItem(category_id: number) {

  await emits('onRemoveEvent', category_id);
  return;

}

function showEditModal(category_id: number){
  console.log(category_id);

}

</script>

<template>
  <tr class="odd:bg-gray-200 border-b-2 border-black hover:bg-gray-300">
    <td class="border-r-2 border-r-black text-center">{{ idx }}</td>
    <td class="border-r-2 border-r-black px-2">{{ category.name }}</td>
    <td class="w-[20vw] text-xl mx-auto">
      <div class="flex justify-around">
        <button @click="showEditModal(category.id)"
        class="my-2 text-teal-700 hover:scale-125 transition-all duration-100">
          <i class="fa-solid fa-pen-to-square"></i>
          <span class="hidden sm:inline-block">編輯</span>
        </button>
        <button @click="showRmoveItemConfirm(category.id)" class="my-2 text-red-700 hover:scale-125 transition-all duration-100">
          <i class="fa-solid fa-xmark"></i>
          <span class="hidden sm:inline-block">刪除</span>
        </button>
      </div>
    </td>
  </tr>
</template>

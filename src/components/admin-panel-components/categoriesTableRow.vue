<script setup lang="ts">
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal.js'
import formEditCategoryVue from '@/components/admin-panel-components/formEditCategory.vue'

defineProps(['category', 'idx', 'store', 'data'])
const emits = defineEmits(['onRemoveEvent', 'onUpdateEvent'])

const modal = useGlobalModalStore()

function showRmoveItemConfirm(category_id: number) {
  modal.use_confirm()
  modal.set_content('是否確認刪除此筆資料?')
  modal.set_confirm_btn_text('沒錯!')
  modal.set_cancel_btn_text('我再想想..')
  modal.set_confirm_callback_fn(removeItem, category_id)
  modal.set_confirm_callback_type_async()
  modal.toggle()
}

async function removeItem(category_id: number) {
  await emits('onRemoveEvent', category_id)
  return
}
async function updateItem(category_id: number) {
  await emits('onUpdateEvent', category_id)
  return
}

function showEditModal(category: any) {
  const props = { category }

  modal.set_callback_fn_arr([
    {
      fn: updateItem,
      params: [],
      is_async: true,
    },
  ])

  modal.set_props(props)

  modal.use_custom_component(formEditCategoryVue)
  modal.toggle()
}
</script>

<template>
  <tr class="odd:bg-gray-200 border-b-2 border-black hover:bg-gray-300">
    <td class="border-r-2 border-r-black text-center">{{ idx }}</td>
    <td class="border-r-2 border-r-black px-2">{{ category.name }}</td>
    <td class="w-[20vw] text-xl mx-auto">
      <div class="flex justify-around">
        <button
          class="my-2 text-teal-700 hover:scale-125 transition-all duration-100"
          @click="showEditModal(category)"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span class="hidden sm:inline-block">編輯</span>
        </button>
        <button
          class="my-2 text-red-700 hover:scale-125 transition-all duration-100"
          @click="showRmoveItemConfirm(category.id)"
        >
          <i class="fa-solid fa-xmark"></i>
          <span class="hidden sm:inline-block">刪除</span>
        </button>
      </div>
    </td>
  </tr>
</template>

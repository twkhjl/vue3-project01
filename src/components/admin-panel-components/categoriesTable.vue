<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../../stores/admin-panel/category.js'
import TableRow from './categoriesTableRow.vue'
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal.js'
import { useGlobalLoadingState } from '../../stores/admin-panel/global_loading_state.js'

let data: any = ref(null)
const categoryStore = useCategoryStore()
const global_modal_store = useGlobalModalStore()
const global_loading_state = useGlobalLoadingState()

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  global_loading_state.start_loading()

  let result: any = await categoryStore.all()

  if (!result.error) {
    data.value = result
  }

  global_loading_state.stop_loading()
})

async function removeItem(category_id: number) {
  global_loading_state.start_loading()
  let result: any = await categoryStore.destroy({ id: category_id })

  if (!result.error) {
    data.value = data.value.filter((o: any) => o.id !== category_id)
  }
  global_loading_state.stop_loading()
  global_modal_store.hide()

  global_modal_store.use_alert()
  global_modal_store.set_content('資料已成功刪除')
  global_modal_store.show()

  return
}
function updateItem(params: any) {
  const category_id = params[0]
  const updated_data = params[1]

  let old_data_idx = data.value.findIndex((v: any) => v.id == category_id)
  let obj = data.value[old_data_idx]

  for (let prop in data.value[old_data_idx]) {
    if (updated_data[prop]) obj[prop] = updated_data[prop]
  }
}
</script>

<template>
  <div class="mt-4 mx-auto border-gray-100 border-2 p-4 w-[95vw] sm:w-[60vw]">
    <div class="w-full mb-4 flex items-center relative">
      <div class="text-[6vw] sm:text-[3vw] font-extrabold ml-0 mx-auto">
        分類列表
      </div>
      <button
        class="absolute right-4 hover:animate-pulse hover:font-extrabold hover:text-green-600"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
      <input
        class="w-[55vw] sm:w-auto h-[5vh] border-2 border-black rounded-full outline-none pl-4 my-2 text-xl focus:outline-4 focus:outline-offset-0 focus:outline-gray-400"
        type="text"
        placeholder="輸入關鍵字..."
      />
    </div>

    <table class="table-auto w-full border-[1px] border-gray-400">
      <thead
        class="text-2xl text-center font-extrabold border-b-4 border-b-black"
      >
        <th class="w-10">#</th>
        <th class="border-black border-x-2">分類名稱</th>
        <th></th>
      </thead>
      <tbody class="text-xl">
        <TransitionGroup name="fade">
          <template v-for="(item, idx) in data" :key="idx">
            <TableRow
              :category="item"
              :idx="idx + 1"
              :store="categoryStore"
              :data="data"
              @on-remove-event="removeItem"
              @on-update-event="updateItem"
            >
            </TableRow>
          </template>
        </TransitionGroup>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
/* .fade-enter-from, */
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
  transform: translate(0, -100px);
}

.fade-leave-active {
}
</style>

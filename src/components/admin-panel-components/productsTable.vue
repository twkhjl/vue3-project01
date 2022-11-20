<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from '../../stores/admin-panel/product.js'
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal.js'
import { useGlobalLoadingState } from '../../stores/admin-panel/global_loading_state.js'
import TableRow from '../../components/admin-panel-components/productsTableRow.vue'

let data: any = ref(null)
const productStore = useProductStore()
const global_modal_store = useGlobalModalStore()
const global_loading_state = useGlobalLoadingState()

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  global_loading_state.start_loading()

  let result: any = await productStore.paginate()
  console.log(result)
  if (!result.error) {
    data.value = result[0].data
  }

  global_loading_state.stop_loading()
})
</script>

<template>
  <div class="mt-4 mx-auto border-gray-100 border-2 p-4 w-[95vw] sm:w-[80vw]">
    <div class="w-full mb-4 flex items-center relative">
      <div class="text-[4vw] sm:text-[2vw] font-extrabold ml-0 mx-auto">
        產品列表
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
        <th class="border-black border-x-2">產品名稱</th>
        <th class="border-black border-x-2">產品描述</th>
        <th class="border-black border-x-2">價格</th>
        <th class="border-black border-x-2">庫存數量</th>
        <th class="border-black border-x-2">訂購數量</th>
        <th></th>
      </thead>
      <tbody class="text-xl">
        <template v-for="(item, idx) in data" :key="idx">
          <TableRow :product="item" :idx="idx + 1" :data="data"> </TableRow>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref,watch,onMounted } from "vue";
import ajax from '../../helpers/ajax';
import {useAdminStore} from '../../stores/admin-panel/admin';
import {useCategoryStore} from '../../stores/admin-panel/category';
import TableRow from './categoriesTableRow.vue';

let data:any=ref(null);
const adminStore = useAdminStore();
const categoryStore = useCategoryStore();

const API_ROOT_URL='https://vue3-project01-api.twkhjl-test.duckdns.org/api/category/';

onMounted(async ()=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });

  let result = await categoryStore.all();

  if(!result.error){
    data.value = result;
  }

})

</script>

<template>
<div class=" 
mt-4  mx-auto border-gray-100 border-2 p-4
w-[95vw] sm:w-[60vw]">

<div class="w-full mb-4
flex items-center
relative">
<div class="text-[6vw] sm:text-[3vw] font-extrabold ml-0 mx-auto">分類列表</div>
   <button class="absolute right-4 hover:animate-pulse hover:font-extrabold hover:text-green-600"><i class="fa-solid fa-magnifying-glass"></i></button>
  <input class="w-[55vw] sm:w-auto h-[5vh] border-2 border-black rounded-full outline-none pl-4 my-2 text-xl 
  focus:outline-4 focus:outline-offset-0 focus:outline-gray-400"
   type="text" placeholder="輸入關鍵字...">
</div>

  <table class="table-auto w-full border-[1px] border-gray-400">
    <thead class="text-2xl text-center font-extrabold border-b-4 border-b-black">
    <th class="w-10">#</th>
    <th class="border-black border-x-2">分類名稱</th>
    <th></th>
    </thead>
    <tbody class="text-xl">
      <template v-for="(item,idx) in data">
        <TableRow :category="item" :idx="idx+1"></TableRow>
      </template>
    </tbody>
  </table>
</div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref, onBeforeMount, computed, watch } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin';

const adminStore = useAdminStore();

function create() {

  console.log('create');
}

</script>


<template>


  <div class="mx-auto flex h-auto w-full 
flex-col items-center justify-center md:w-[80vw] py-10">
    <div class="mt-4 mb-4 text-center text-4xl">創建分類</div>
    <div class="rounded-md border-t-[1px] bg-[#ecf0f3] shadow-lg shadow-[#474444]">
      <form class="flex h-auto w-[70vw] flex-col px-6 md:w-[40vw]">
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類名稱</div>
          <div class="mt-2 mb-2 text-red-500">*分類名稱不可空白</div>
          <input class="text-xl h-[60px] w-full rounded-2xl bg-[#ecf0f3] px-2 
          shadow-inset1 outline-none
          focus:ring-4 focus:ring-purple-500" type="text" placeholder="請輸入分類名稱" />
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類描述</div>
          <div class="mt-2 mb-2 text-red-500">*分類描述不可空白</div>
          <textarea class="h-[30vh] w-full resize-none rounded-2xl bg-[#ecf0f3] 
            px-4 py-4 text-xl shadow-inset1 outline-none
            focus:ring-4 focus:ring-purple-500" name="" id="" cols="50" rows="30"></textarea>
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類圖片</div>
          <div class="mt-2 mb-2 text-red-500">*只能上傳圖片檔案</div>
          <label class='block 
              w-auto sm:w-[15vw] h-[15vh] mt-4 rounded-lg text-center ml-0
              text-gray-300 bg-teal-700 leading-[15vh]
              shadow-sm shadow-black text-xl
              hover:text-white hover:bg-teal-600 hover:text-2xl hover:leading-[16vh]
              transition-all duration-150 cursor-pointer'>
            <input type="file" class="hidden" name="logo" id="logo" />
            <i class="fa-regular fa-image"></i>
            <span class="ml-2">上傳</span>
          </label>
          <img class="mr-6 mb-6 w-48" id="imgPreview" src="" alt="" />
        </div>

        <div class="flex justify-sstart mb-4">
          <button @click.prevent="create()" class="h-[7vh] w-[40%] 
      rounded-md border-2 border-gray-300 
      bg-green-800 text-2xl text-white outline-none hover:bg-green-400 hover:text-black">建立</button>

          <button @click.prevent="create()" class="h-[7vh] w-[40%] mr-0 mx-auto
      rounded-md border-2 border-gray-300 
      bg-gray-600 text-2xl text-white outline-none hover:bg-slate-400 hover:text-black">取消</button>
        </div>
      </form>
    </div>
  </div>

</template>
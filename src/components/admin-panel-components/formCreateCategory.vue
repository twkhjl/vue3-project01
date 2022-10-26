<script setup lang="ts">
import router from '@/router';
import { ref, onBeforeMount, computed, watch } from 'vue'

import { useAdminStore } from '../../stores/admin-panel/admin';

const adminStore = useAdminStore();
const input_img: any = ref();
const div_drop_area:any=ref();

function create() {

  console.log('create');
}

function previewImg() {
  const [file] = img.files
  if (file) {
    imgPreview.src = URL.createObjectURL(file)
  }
}

function dropHandler(e: any) {
  e.preventDefault();
  
  input_img.value.value = '';
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    imgPreview.src = reader.result;
  }, false);

  let file = e.dataTransfer.files[0];
  if (file) {
    reader.readAsDataURL(file);
  }





}

function dragoverHandler(e: any) {
  e.preventDefault();
  e.stopPropagation();
  return;

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
          focus:ring-4 focus:ring-purple-500" name="name" type="text" placeholder="請輸入分類名稱" />
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類描述</div>
          <div class="mt-2 mb-2 text-red-500">*分類描述不可空白</div>
          <textarea class="h-[30vh] w-full resize-none rounded-2xl bg-[#ecf0f3] 
            px-4 py-4 text-xl shadow-inset1 outline-none
            focus:ring-4 focus:ring-purple-500" name="description" cols="50" rows="30"></textarea>
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類圖片</div>
          <div class="mt-2 mb-2 text-red-500">*只能上傳圖片檔案</div>
          <div 
            class="
            ">

            

            <label ref="div_drop_area" 
            @drop.prevent="dropHandler" 
            @dragenter.prevent 
            @dragover.prevent="dragoverHandler"
            class='relative flex justify-center items-center h-[30vh]
            mb-4 border-[8px] border-[#a2a0a0] border-dashed
            z-0 cursor-pointer'>
              <input ref="input_img" @change="previewImg()" type="file" class="hidden" name="img" id="img" />
              <span class="absolute mx-auto text-[10vw] text-gray-400 opacity-30">
              <i class="fa-regular fa-image"></i>
            </span>
              <span class="ml-2 text-2xl">點擊選擇圖片或拖曳圖片至此</span>
            </label>
            
          </div>
          <div class="mb-2 text-xl font-extrabold">圖片預覽</div>
          <img class="w-full h-48" id="imgPreview" src="" alt="" />
        </div>

        <div class="flex justify-sstart my-4">
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
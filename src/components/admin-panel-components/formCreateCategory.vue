<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

import { useCategoryStore } from '../../stores/admin-panel/category.js'
import { useFileHelper } from '@/helpers/fileHelper'

const categoryStore = useCategoryStore()
const fileHelper = useFileHelper()

const inputImg: any = ref()
const input_name: any = ref()
const textarea_description: any = ref()
const imgPreview: any = ref()
const img: any = ref(null)

const errors: any = ref(null)

const serverError: any = ref(false)

const div_drop_area: any = ref()

async function previewImg() {
  const file = inputImg.value.files[0]
  if (file) {
    imgPreview.value.src = URL.createObjectURL(file)
    const img_data = await fileHelper.readFileAsDataURL(file)
    img.value = img_data
  }
}
async function dropHandler(e: any) {
  e.preventDefault()

  inputImg.value.value = ''
  let file = e.dataTransfer.files[0]
  if (file) {
    imgPreview.value.src = URL.createObjectURL(file)
    const img_data = await fileHelper.readFileAsDataURL(file)
    img.value = img_data
  }
}

async function create() {
  errors.value = null

  let data = {
    name: input_name.value.value,
    description: textarea_description.value.value,
    img: img.value,
  }

  let result: any = await categoryStore.store(data)
  if (result.errors) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    errors.value = result.errors
    return
  }
  if (result.error && result.error == 'server') {
    serverError.value = true
    return
  }

  router.push({ name: 'admin.categories' })
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-auto w-full md:w-[80vw] py-10"
  >
    <div class="mt-4 mb-4 text-center text-4xl">創建分類</div>
    <div v-if="serverError" class="mt-2 mb-2 text-red-500">
      *系統異常,請聯絡管理員
    </div>

    <div
      class="rounded-md border-t-[1px] bg-[#ecf0f3] shadow-lg shadow-[#474444]"
    >
      <form class="flex h-auto w-[70vw] flex-col px-6 md:w-[40vw]">
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類名稱</div>
          <div v-if="errors && errors.name" class="mt-2 mb-2 text-red-500">
            *{{ (errors && errors.name[0]) || '' }}
          </div>
          <input
            ref="input_name"
            class="text-xl h-[60px] w-full rounded-2xl bg-[#ecf0f3] px-2 shadow-inset1 outline-none focus:ring-4 focus:ring-purple-500"
            name="name"
            type="text"
            placeholder="請輸入分類名稱"
          />
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類描述</div>
          <div
            v-if="errors && errors.description"
            class="mt-2 mb-2 text-red-500"
          >
            *{{ (errors && errors.description[0]) || '' }}
          </div>
          <textarea
            ref="textarea_description"
            class="h-[30vh] w-full resize-none rounded-2xl bg-[#ecf0f3] px-4 py-4 text-xl shadow-inset1 outline-none focus:ring-4 focus:ring-purple-500"
            name="description"
            cols="50"
            rows="30"
          ></textarea>
        </div>
        <div class="mt-2">
          <div class="mb-2 text-xl font-extrabold">分類圖片</div>
          <div v-if="errors && errors.img" class="mt-2 mb-2 text-red-500">
            *{{ (errors && errors.img[0]) || '' }}
          </div>
          <div class="">
            <label
              ref="div_drop_area"
              class="relative flex justify-center items-center h-[30vh] mb-4 border-[8px] border-dashed border-[#656565] z-0 cursor-pointer"
              @drop.prevent="dropHandler"
              @dragenter.prevent
              @dragover.prevent
            >
              <input
                ref="inputImg"
                type="file"
                class="hidden"
                name="img"
                @change="previewImg()"
              />
              <span
                class="absolute flex sm:text-[10vw] text-[20vw] text-gray-400 opacity-50"
              >
                <i class="fa-regular fa-image"></i>
              </span>
              <span class="ml-2 text-2xl">點擊選擇圖片或拖曳圖片至此</span>
            </label>
          </div>
          <div v-if="img" class="mb-2 text-xl font-extrabold">圖片預覽</div>
          <img
            id="id_imgPreview"
            ref="imgPreview"
            class="w-full max-h-48"
            alt=""
          />
        </div>

        <div class="flex justify-between my-4">
          <button
            class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-green-800 text-2xl text-white outline-none hover:bg-green-400 hover:text-black"
            @click.prevent="create()"
          >
            建立
          </button>

          <button
            class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-gray-600 text-2xl text-white outline-none hover:bg-slate-400 hover:text-black"
            @click.prevent="router.go(-1)"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

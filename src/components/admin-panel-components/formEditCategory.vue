<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useCategoryStore } from '../../stores/admin-panel/category.js'
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal'
import { useFileHelper } from '@/helpers/fileHelper'
import router from '@/router'

const categoryStore = useCategoryStore()
const modal = useGlobalModalStore()
const fileHelper = useFileHelper()

const inputImg: any = ref()
const inputName: any = ref()
const textareaDescription: any = ref()
const imgPreview: any = ref()
const img: any = ref(null)

const errors: any = ref(null)

const serverError: any = ref(false)

const div_drop_area: any = ref()

const isLoading = ref(false)

// const isDragEnter: any = ref(false)

const props = defineProps(['category'])

const imgRootURL = import.meta.env.VITE_API_ROOT_FILE_URL

onMounted(async () => {
  inputName.value.value = props.category.name
  textareaDescription.value.value = props.category.description
  if (props.category.img) console.log()
  imgPreview.value.src = imgRootURL + props.category.img
})

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

async function update() {
  errors.value = null
  isLoading.value = true
  const data = {
    id: props.category.id,
    name: inputName.value.value,
    description: textareaDescription.value.value,
    img: img.value,
  }

  let result: any = await categoryStore.update(data)
  isLoading.value = false
  if (result.errors) {
    // window.scrollTo({ top: 0, behavior: 'smooth' })
    inputName.value.focus()
    textareaDescription.value.focus()
    errors.value = result.errors
    return
  }
  if (result.error && result.error == 'server') {
    serverError.value = true
    return
  }

  const fns = modal.get_callback_fn_arr()

  modal.exec_fn(fns[0].fn, [props.category.id, data])
  modal.hide()

  modal.use_alert()
  modal.set_content('更新成功')
  modal.show()
  router.push({ name: 'admin.categories' })
}
</script>

<template>
  <div
    class="overflow-y-scroll overflow-x-hidden scroll-smooth h-[80vh] shadow-black shadow-lg"
  >
    <div
      class="sticky z-[1] top-0 shadow-md shadow-black w-[40vw] mx-auto ml-0 flex bg-teal-800 p-4 justify-center text-2xl text-white"
    >
      <div>編輯分類</div>
    </div>
    <form
      class="flex h-auto w-auto flex-col px-6 bg-[#ecf0f3] shadow-lg shadow-[#474444]"
    >
      <div v-if="serverError" class="text-red-500 mt-4 text-xl">
        *系統錯誤,請聯繫管理員
      </div>
      <div class="mt-2">
        <div class="mb-2 text-xl font-extrabold">分類名稱</div>
        <div v-if="errors && errors.name" class="mt-2 mb-2 text-red-500">
          *{{ (errors && errors.name[0]) || '' }}
        </div>
        <input
          ref="inputName"
          class="text-xl h-[60px] w-full rounded-2xl bg-[#ecf0f3] px-2 shadow-inset1 outline-none focus:ring-4 focus:ring-purple-500"
          name="name"
          type="text"
          placeholder="請輸入分類名稱"
        />
      </div>
      <div class="mt-2">
        <div class="mb-2 text-xl font-extrabold">分類描述</div>
        <div v-if="errors && errors.description" class="mt-2 mb-2 text-red-500">
          *{{ (errors && errors.description[0]) || '' }}
        </div>
        <textarea
          ref="textareaDescription"
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
              @change="previewImg"
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
        <template v-if="!isLoading">
          <button
            :disabled="serverError"
            :class="serverError ? ['bg-green-400', 'hover:text-white'] : ['']"
            class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-green-800 text-2xl text-white outline-none hover:bg-green-400 hover:text-black"
            @click.prevent="update()"
          >
            修改
          </button>
          <button
            class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-gray-600 text-2xl text-white outline-none hover:bg-slate-400 hover:text-black"
            @click.prevent="modal.hide()"
          >
            取消
          </button>
        </template>
        <template v-else>
          <div class="flex justify-center w-full">
            <div
              class="text-black text-center leading-[6vh] h-[7vh] w-full rounded-md border-2 border-gray-300 bg-green-400 text-2xl text-white outline-none"
            >
              <i class="animate-spin fa-solid fa-spinner"></i>
              請稍候...
            </div>
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

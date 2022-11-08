<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useCategoryStore } from '../../stores/admin-panel/category.js'
import { useGlobalModalStore } from '@/stores/admin-panel/global_modal'

const categoryStore = useCategoryStore()
const modal = useGlobalModalStore()

const input_img: any = ref()
const input_name: any = ref()
const textarea_description: any = ref()
const img: any = ref(null)

const errors: any = ref(null)

const serverError: any = ref(false)

const div_drop_area: any = ref()

// const isDragEnter: any = ref(false)

const props = defineProps(['id'])

onMounted(() => {
  console.log('id:')
    console.log(props.id)
})

async function previewImg() {
    const file = input_img.value.files[0]

    const imgPreview: any = document.querySelector('#id_imgPreview')

    imgPreview.src = URL.createObjectURL(file) || ''

    let img_data = await readImgFile(file)
    img.value = img_data
}
function readImgFile(file: any) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()

        reader.onload = () => {
            resolve(reader.result)
        }

        reader.onerror = reject

        reader.readAsDataURL(file)
    })
}

async function update() {
    errors.value = null

    console.log('updated')
}
</script>

<template>
    <div
        class="overflow-y-scroll scroll-smooth h-[80vh] shadow-black shadow-lg"
    >
        <form
            class="flex h-screen w-auto flex-col px-6 bg-[#ecf0f3] shadow-lg shadow-[#474444]"
        >
            <div class="mt-2">
                <div class="mb-2 text-xl font-extrabold">分類名稱</div>
                <div
                    v-if="errors && errors.name"
                    class="mt-2 mb-2 text-red-500"
                >
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
                    >
                        <input
                            ref="input_img"
                            @change="previewImg()"
                            type="file"
                            class="hidden"
                            name="img"
                        />
                        <span
                            class="absolute flex sm:text-[10vw] text-[20vw] text-gray-400 opacity-50"
                        >
                            <i class="fa-regular fa-image"></i>
                        </span>
                        <span class="ml-2 text-2xl"
                            >點擊選擇圖片或拖曳圖片至此</span
                        >
                    </label>
                </div>
                <div v-if="img" class="mb-2 text-xl font-extrabold">
                    圖片預覽
                </div>
                <img class="w-full max-h-48" id="id_imgPreview" alt="" />
            </div>

            <div class="flex justify-between my-4">
                <button
                    @click.prevent="update()"
                    class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-green-800 text-2xl text-white outline-none hover:bg-green-400 hover:text-black"
                >
                    修改
                </button>

                <button
                    @click.prevent="modal.hide()"
                    class="h-[7vh] w-[40%] rounded-md border-2 border-gray-300 bg-gray-600 text-2xl text-white outline-none hover:bg-slate-400 hover:text-black"
                >
                    取消
                </button>
            </div>
        </form>
    </div>
</template>

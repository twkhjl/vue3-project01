<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/admin-panel/auth/admin_auth'
import { useStorageStore } from '@/stores/admin-panel/auth/admin_storage'

const name = ref(null)
const password = ref(null)
const rememberMe = ref(false)
const isValid = ref(true)
const errMsg = ref('')

const auth = useAuthStore()
const storage = useStorageStore()

const isLoading = ref(false)

const err_msg_arr = {
    err: '帳號或密碼錯誤',
    server: '系統異常,請聯絡管理員處理',
}

async function login() {
    let user = {
        name: name.value,
        password: password.value,
    }
    isLoading.value = true
    let result: any = await auth.login(user)

    isLoading.value = false

    if (result.error) {
        errMsg.value = err_msg_arr.err
        return (isValid.value = false)
    }
    if (!result.user || !result.token) {
        errMsg.value = err_msg_arr.server
        return (isValid.value = false)
    }

    storage.saveAdmin(result.user, rememberMe.value)
    storage.saveToken(result.token, rememberMe.value)
    isValid.value = true

    // window.location.assign('/admin/');
    router.push({ name: 'admin.main' })
}
</script>

<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    />

    <div class="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
        <div
            class="bg-gray-100 rounded-md shadow-md shadow-black border-t-[1px] relative"
        >
            <div
                class="absolute z-10 bg-teal-700 text-white top-[-17%] left-0 right-0 w-[120px] h-[120px] rounded-[100%] mx-auto text-center flex justify-center"
            >
                <div class="leading-[120px] text-[60px]">
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <form
                class="relative flex flex-col w-[70vw] h-auto px-6 pb-6 md:w-[35vw]"
            >
                <div class="text-4xl text-center mt-16 mb-4">後台登入</div>
                <div v-if="!isValid" class="text-xl text-red-400">
                    {{ errMsg }}
                </div>

                <input
                    v-model="name"
                    @keyup="isValid = true"
                    class="outline-none border-2 border-gray-300 w-full h-[40px] rounded-md px-2 mb-4"
                    type="text"
                    placeholder="帳號"
                />
                <input
                    v-model="password"
                    @keyup="isValid = true"
                    class="outline-none border-2 border-gray-300 w-full h-[40px] rounded-md px-2 mb-4"
                    type="password"
                    placeholder="密碼"
                />

                <!-- checkbox -->
                <label class="relative flex items-center ml-0 mx-auto w-auto">
                    <input
                        type="checkbox"
                        v-model="rememberMe"
                        class="peer absolute left-0 h-0 w-0"
                    />
                    <span
                        class="relative block h-[35px] w-[35px] rounded-sm border-4 border-green-700 hover:bg-green-200 peer-checked:bg-green-200 transition-all duration-200 after:top-4 after:left-3 after:absolute after:h-[0px] after:w-[0px] after:rotate-[225deg] after:border-t-[0px] after:border-l-[0px] after:border-t-green-700 after:border-l-green-700 peer-checked:after:h-[15px] peer-checked:after:w-[12px] peer-checked:after:border-t-[4px] peer-checked:after:border-l-[4px] peer-checked:after:top-1 peer-checked:after:left-2 after:transition-all after:duration-200"
                    ></span>
                    <div
                        class="ml-2 relative transition-all duration-150 after:w-0 after:transition-all after:duration-150 after:absolute after:bottom-0 after:left-0 after:border-b-2 after:border-b-green-500 peer-checked:after:w-full peer-checked:font-extrabold"
                    >
                        記住我
                    </div>
                </label>

                <template v-if="isLoading">
                    <span
                        class="outline-none border-2 border-gray-300 bg-teal-400 text-black text-2xl w-full h-[7vh] rounded-md px-2 mt-7 text-center leading-[7vh]"
                    >
                        <i class="animate-spin mr-2 fa-solid fa-arrows-spin"></i
                        >請稍候...</span
                    >
                </template>
                <template v-else>
                    <button
                        @click.prevent="login()"
                        class="outline-none hover:bg-teal-500 bg-teal-600 text-white text-2xl w-full h-[7vh] rounded-md px-2 mt-7"
                    >
                        登入
                    </button>
                </template>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useSidebarStore } from '../../stores/admin-panel/sidebar.js'
import { useBreakPointStore } from '../../stores/common/breakpoint.js'

import SidebarItem from './sidebarItem.vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const sidebarStore = useSidebarStore()
const breakpointStore = useBreakPointStore()

onMounted(async () => {
    if (width.value >= breakpointStore.md) {
        sidebarStore.KeepSidebarWhenClick()
    }
    sidebarStore.HideSidebarWhenClick()
})

watch(width, (newVal) => {
    if (newVal >= breakpointStore.md) {
        sidebarStore.KeepSidebarWhenClick()
    }
    sidebarStore.HideSidebarWhenClick()
})

const sidebarItemData = [
    {
        name: '產品分類管理',
        icon: 'fa-solid fa-folder-tree',
        children: [
            {
                name: '分類列表',
                icon: 'fa-solid fa-list-ui',
                link: { name: 'admin.categories' },
            },
            {
                name: '新增分類',
                icon: 'fa-solid fa-list-ui',
                link: { name: 'admin.categories.new' },
            },
        ],
    },
    { name: 'ttt', icon: 'fa-solid fa-users', link: { name: 'ttt' } },
    {
        name: 'item1',
        icon: 'fa-solid fa-users',
        children: [
            {
                name: 'item1-1',
                icon: 'fa-solid fa-users',
                link: { name: 'main' },
            },
            {
                name: 'item1-2',
                icon: 'fa-solid fa-check',
                link: { name: 'ttt' },
            },
            {
                name: 'item1-3',
                icon: 'fa-solid fa-users',
                link: { name: 'main' },
            },
        ],
    },
    {
        name: 'item2',
        icon: 'fa-solid fa-users',
        children: [
            {
                name: 'item2-1',
                icon: 'fa-solid fa-users',
                link: { name: 'main' },
            },
            {
                name: 'item2-2',
                icon: 'fa-solid fa-users',
                link: { name: 'main' },
            },
        ],
    },
]
</script>

<template>
    <div
        :class="[sidebarStore.isSidebarHidden() ? 'hidden' : '']"
        class="fixed h-full w-full z-20 bg-black opacity-[0.5] md:hidden"
        @click="sidebarStore.toggleSidebar()"
    ></div>

    <div
        :class="[sidebarStore.isSidebarHidden() ? 'w-[0vw]' : 'w-[50vw]']"
        class="sidebar overflow-hidden fixed left-0 z-30 h-[100vh] transition-all duration-250 bg-gray-700 shadow-md shadow-black md:w-[20vw]"
    >
        <div
            class="sidebar-title text-white text-2xl text-center py-4 border-b-gray-500 border-b-2"
        >
            <i class="fa-solid fa-computer"></i>
            <span class="ml-4">Admin Panel</span>
        </div>
        <div class="flex flex-col">
            <SidebarItem
                v-for="(itemData, idx) in sidebarItemData"
                :key="idx"
                :item-data="itemData"
            />
        </div>
    </div>
</template>

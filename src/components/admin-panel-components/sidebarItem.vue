<script setup lang="ts">
import { computed, ref, onBeforeMount, onMounted, watch } from 'vue';
import {useSidebarStore} from '../../stores/admin-panel/sidebar';
import router from '@/router';

const props = defineProps(['itemData',]);
const sideBarStore=useSidebarStore();

let showSubItem = ref(false);
let hasChildren = function(){
  return props.itemData.children && props.itemData.children.length;
}


function toggleSubItem() {
  showSubItem.value = !showSubItem.value;
}


function itemOnClick(link:string){
  if(hasChildren()){
    showSubItem.value = !showSubItem.value;
  }
  if(link){
    router.push(link);
  }
  if(sideBarStore.isSidebarHiddenWhenClick() && !(props.itemData.children && props.itemData.children.length)){
    sideBarStore.hideSidebar();
  }

}

</script>



<template>
  <template>

  </template>
  <div>
    <div @click="itemOnClick(itemData.link || '')" 
    :class="hasChildren()?'':'cursor-pointer'"
    class="sidebar-item flex
        text-xl text-white py-2 hover:bg-gray-600">
      <span class="mx-2"><i :class="itemData.icon"></i></span>
      <span>{{ itemData.name }}</span>
      <span v-if="hasChildren()" class="mr-4 mx-auto">
        <template v-if="showSubItem">
          <i class="fa-solid fa-angle-down"></i>
        </template>
        <template v-else>
          <i class="fa-solid fa-angle-left"></i>
        </template>
      </span>
    </div>
      <div :class="showSubItem?['max-h-[200px]']:['max-h-0']"
      class="overflow-hidden transition-all duration-200">
        <sidebarItem v-for="item in itemData.children" :itemData="item" />
      </div>
  </div>

</template>

<style scoped>

* {
  /* border: 1px solid black; */
}


</style>
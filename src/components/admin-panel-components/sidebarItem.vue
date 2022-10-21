<script setup lang="ts">
import {computed, ref} from 'vue';
const props = defineProps(['itemData']);

let isShow=ref(false);
let hasChildren=computed(()=>props.itemData.children && props.itemData.children.length);
function toggleSubItem(){
  isShow.value=!isShow.value;
}

</script>



<template>
  <template>

  </template>
  <div>
    <div @click="toggleSubItem()"
    class="sidebar-item flex
        text-xl text-white py-2">
      <span class="mx-2"><i class="fa-solid fa-user"></i></span>
      <RouterLink :to="{name:'main'}">{{ itemData.name }}</RouterLink>
      <span v-if="hasChildren"
      class="mr-4 mx-auto">
      <template v-if="isShow">
        <i class="fa-solid fa-angle-down"></i>
      </template>
      <template v-else>
        <i class="fa-solid fa-angle-left"></i>
      </template>
      </span>
    </div>
    <sidebarItem v-if="isShow" v-for="item in itemData.children" :itemData="item"/>
  </div>
  
</template>
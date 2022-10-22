<script setup lang="ts">
import { computed, ref, onBeforeMount, onMounted } from 'vue';
const props = defineProps(['itemData']);

let isShow = ref(true);
let hasChildren = computed(() => props.itemData.children && props.itemData.children.length);
function toggleSubItem() {
  isShow.value = !isShow.value;
}

const sidebarChildren=ref(null);

onBeforeMount(()=>{

})

let clientHeight=ref(0);
let h = `h-[${clientHeight.value}px]`;

onMounted(()=>{
  
  clientHeight.value=sidebarChildren.value.clientHeight;
  isShow.value=false;
})


</script>



<template>
  <template>

  </template>
  <div>
    <div @click="toggleSubItem()" class="sidebar-item flex
        text-xl text-white py-2">
      <span class="mx-2"><i class="fa-solid fa-user"></i></span>
      <RouterLink :to="itemData.link">{{ itemData.name }}</RouterLink>
      <span v-if="hasChildren" class="mr-4 mx-auto">
        <template v-if="isShow">
          <i class="fa-solid fa-angle-down"></i>
        </template>
        <template v-else>
          <i class="fa-solid fa-angle-left"></i>
        </template>
      </span>
    </div>
      <div :class="isShow?['max-h-[200px]']:['max-h-0']"
      ref="sidebarChildren" 
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
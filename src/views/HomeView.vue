<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../stores/admin-panel/admin';
import router from '@/router';
const adminStore = useAdminStore();

onMounted(() => {

if(!adminStore.isLoggedIn()){
  router.push({name:'login'});
}

})

</script>


<template>
  <div class="p-2">
    <div class="text-2xl mb-4">
      Home View
    </div>
    <RouterLink to='/admin/login'
    class="border-2 border-black px-4 py-2 rounded-md"
    >login</RouterLink>
  </div>
  
</template>

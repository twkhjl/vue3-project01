<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAdminStore } from '../stores/admin-panel/admin';
import router from '@/router';
const adminStore = useAdminStore();

onMounted(() => {})

</script>


<template>
  <div class="p-2">
    <div class="text-2xl mb-4">
      Home View
    </div>
  </div>
  
</template>

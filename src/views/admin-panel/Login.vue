<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAdminStore } from '../../stores/admin-panel/admin';
import AdminLoginForm from '../../components/admin-panel-components/loginForm.vue'

import router from "@/router";

const adminStore = useAdminStore();

onBeforeMount(async() => {

  await adminStore.validataAdminState();

})



</script>
<template>
  <div class="fixed w-full h-full bg-gray-700 -z-50"></div>
  <AdminLoginForm></AdminLoginForm>
</template>
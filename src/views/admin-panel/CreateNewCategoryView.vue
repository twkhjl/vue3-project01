<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAdminStore } from '../../stores/admin-panel/admin.js';

import FormCreateCategory from '../../components/admin-panel-components/formCreateCategory.vue'


const adminStore = useAdminStore();

onBeforeMount(async()=>{
  await adminStore.validataAdminState();

})

</script>

<template>
<FormCreateCategory></FormCreateCategory>
</template>
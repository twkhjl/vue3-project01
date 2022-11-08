<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAdminStore } from '../../stores/admin-panel/admin.js';

import CategoriesTable from "../../components/admin-panel-components/categoriesTable.vue";

const adminStore = useAdminStore();

onBeforeMount(async()=>{
  //await adminStore.validataAdminState();

})

</script>

<template>
<CategoriesTable></CategoriesTable>
</template>


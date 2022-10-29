<script setup lang="ts">
import { onMounted } from "vue";
import CategoriesTable from "../../components/admin-panel-components/categoriesTable.vue";
import { useAdminStore } from '../../stores/admin-panel/admin';

const adminStore = useAdminStore();

onMounted(async() => {
})

</script>

<template>
<CategoriesTable></CategoriesTable>
</template>


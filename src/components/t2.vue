<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import mitt from "mitt";


const emitter = mitt();

onMounted(()=>{

  emitter.on('*', (type, e) => console.log(type, e) )
})
</script>

<template>
  t2
</template>
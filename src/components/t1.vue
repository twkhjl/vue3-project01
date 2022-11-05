<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import mitt from "mitt";


const emitter = mitt();

function onClickEvent(){
  console.log('clicked');
  emitter.emit('confirm-event','tttttttt');
}
</script>

<template>
  t1
  <button @click="onClickEvent()">click me</button>
</template>
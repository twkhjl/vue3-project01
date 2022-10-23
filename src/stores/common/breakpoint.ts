import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBreakPointStore = defineStore('breakpoint', () => {

/*
tailwind
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px
*/ 

let sm = ref(640);
let md = ref(768);
let lg = ref(1024);



  return {
    sm,md,lg,
  }
})

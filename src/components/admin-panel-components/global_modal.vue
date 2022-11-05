<script lang="ts" setup>
import { ref, TransitionGroup } from 'vue';
import { useGlobalModalStore } from '../../stores/admin-panel/global_modal';
import ConfirmVue from './modals/confirm.vue';
import ModalVue from './modals/modal.vue';
import AlertVue from './modals/alert.vue';

const global_modal_store = useGlobalModalStore();



function hideModal() {
  global_modal_store.hide();
}

const modals = {
  ConfirmVue,
  ModalVue,
  AlertVue,
}

const default_overlay_bg_css=ref('bg-gray-800 opacity-70');
const overlay_disabled_bg_css=ref('opacity-0');

const default_overlay_active_css=ref('transition-all-2 duration-200');
const default_overlay_enter_css=ref('opacity-0');
const default_overlay_leave_css=ref('opacity-0');

const default_modal_active_css=ref('transition-all-2 duration-200');
const default_modal_enter_css=ref('opacity-0 transform translate-y-[-100px]');
const default_modal_leave_css=ref('opacity-0 transform translate-y-[-100px]');

function get_overlay_bg_css(){
  if(!global_modal_store.is_overlay_enabled()) return overlay_disabled_bg_css.value;
  return default_overlay_bg_css.value;
}


</script>

<template>
  <Teleport to="body">
    <Transition
    :enter-active-class="default_modal_active_css"
    :leave-active-class="default_modal_active_css"
    enter-from-class="opacity-0 transform translate-y-[-100px]"
    leave-to-class="opacity-0 transform translate-y-[-100px]"
    >
          <div  v-if="global_modal_store.is_show()"  
          class="
          z-[100] fixed top-[5vh] left-[30vw] mr-auto w-[40vw] h-auto flex flex-col justify-center">
            <component :is="global_modal_store.get_current_modal()"></component>
          </div>
    </Transition>


    <Transition
    enter-active-class="transition-all-2 duration-200"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    >
          <div v-if="global_modal_store.is_show()"
           @click="global_modal_store.hide()" :class="get_overlay_bg_css()"
    class="fixed top-0 left-0 z-[50] h-screen w-screen"></div>
  </Transition>

  </Teleport>

</template>



<style scoped>

/* .fade-move,
.fade-enter-active,
.fade-leave-active,
.overlay-move,
.overlay-enter-active,
.overlay-leave-active
{
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -100px);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
} */


/* .fade-leave-active {} */
</style>


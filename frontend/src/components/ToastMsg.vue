<template>
 <div v-if="toast" class="toast-msg">
   <p>{{ toast?.msg }}</p> 
 </div>
</template>

<script setup>
//==================================
// Import
//==================================
import {
  onBeforeUnmount,
  ref,
  watch
} from "vue";
import { toastMsg } from "@/utils/globals";

//==================================
// Watch
//==================================
const toast = ref( undefined );
let t = undefined;

//==================================
// Watch
//==================================
watch( toastMsg, (newMsg) => {
   toast.value = newMsg[ newMsg.length - 1 ];
   t = setTimeout( () => {
    toast.value = undefined;
   }, toast.value.time);
  }, { deep: true });


//==================================
// Life cycle
//==================================
onBeforeUnmount( () => {
  clearTimeout( t );
});

</script>

<style lang="scss" scoped>
.toast-msg {
  background-color: #eee;
  border-radius: 12px;
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 8px 12px;
  p {
    color: #222;
    font-size: 18px;
  }
}

</style>

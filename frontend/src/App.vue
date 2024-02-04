<template>
  <Icons />
  <NavBar />
  <Transition>
    <RouterView />
  </Transition>
</template>
<script setup>
//==================================
// Import
//==================================
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Icons from "./components/Icons.vue";


</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
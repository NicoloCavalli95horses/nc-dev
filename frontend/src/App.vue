<template>
  <Icons />
  <NavBar />
  <ToastMsg />
  <RouterView />
</template>
<script setup>
//==================================
// Import
//==================================
import { RouterView } from "vue-router";
import ToastMsg from "./components/ToastMsg.vue";
import NavBar from "./components/NavBar.vue";
import Icons from "./components/Icons.vue";

</script>

<style lang="scss" scoped>
</style>
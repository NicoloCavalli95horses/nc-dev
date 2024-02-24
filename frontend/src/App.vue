<template>
  <Icons />
  <NavBar />
  <ToastMsg />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <OnTopBtn />
</template>
<script setup>
//==================================
// Import
//==================================
import { useRoute, RouterView } from "vue-router";
import { watch } from 'vue';
import ToastMsg from "./components/ToastMsg.vue";
import NavBar from "./components/NavBar.vue";
import OnTopBtn from "./components/OnTopBtn.vue";
import Icons from "./components/Icons.vue";

//==================================
// Const
//==================================
const route = useRoute();


//==================================
// Watch
//==================================
watch( () => route.path, () => {
  document.body.style.scrollBehavior = 'auto';
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.style.scrollBehavior = 'smooth';
});

</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 230ms ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
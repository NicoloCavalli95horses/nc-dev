<template>
  <Icons />
  <NavBar />
  <ToastMsg />
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
  <Login v-if="can_login" @close="can_login = false" />
  <OnTopBtn />
  <KeyBoardShortcut :keys="['l']" :modifiers="['Control', 'Alt']" @keydown="can_login = true" />
</template>
<script setup>
//==================================
// Import
//==================================
import {
  onMounted,
  ref,
  watch,
} from 'vue';
import {
  useRoute,
  RouterView
} from "vue-router";

import NavBar           from "./components/NavBar.vue";
import Icons            from "./components/Icons.vue";
import Login            from "./components/Login.vue";
import ToastMsg         from "./components/ToastMsg.vue";
import OnTopBtn         from "./components/OnTopBtn.vue";
import KeyBoardShortcut from "./components/KeyBoardShortcut.vue";

//==================================
// Const
//==================================
const route = useRoute();
const can_login = ref( false );

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
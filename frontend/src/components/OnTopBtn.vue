<template>
  <div class="fixed-right shadow" :class="[show ? 'fade-in' : 'fade-out']">
    <Btn @click="onTopClick">
      <svg><use href="#arrow-up"></use></svg>
    </Btn>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onBeforeMount, onUnmounted, ref } from "vue";

import Btn from "./Btn.vue";

// ==============================
// Props
// ==============================
const show = ref(false);
const emit = defineEmits(["ontop"]);

// ==============================
// Functions
// ==============================
function onTopClick() {
  document.body.scrollTop = 0; // safari
  document.documentElement.scrollTop = 0; // chrome, firefox, opera
  emit("ontop");
}

function onScroll(e) {
  show.value = e.target.scrollTop >= 50 ? true : false;
}

// ==============================
// Life cycle
// ==============================
onBeforeMount(() => {
  document.querySelector("body").addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  document.querySelector("body").removeEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
.fixed-right {
  position: fixed;
  z-index: 1;
  right: 2.2rem;
  bottom: 2.2rem;
  box-shadow: var(--box-shadow);
  border-radius: var(--radius-xl);
  &:deep(button) {
    padding: 10px;
  }
}
.fade-in {
  opacity: 1;
  transition-duration: var(--transition-slow);
}
.fade-out {
  opacity: 0;
  transition-duration: var(--transition-slow);
}
</style>

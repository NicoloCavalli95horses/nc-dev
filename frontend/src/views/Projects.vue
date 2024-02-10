<template>
  <BaseLayout>
    <template #title>Projects</template>
    <template #default>
      <BentoGrid :items="items" :show_filler="show_shuffle" />
      <Btn v-if="show_shuffle" class="shuffle-btn" @click="onShuffle">Shuffle</Btn>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import Btn from "@/components/Btn.vue";
import BentoGrid from "@/components/BentoGrid.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

//==============================
// Consts
//==============================
const items = ref([
  {
    id: Symbol(),
    title: "Pegorer STA website",
    content: "Full responsive single page application with a structured multi steps contact form. Handled the SEO optimization",
    icon: "#trophy",
    href: "https://www.pegorersta.it/",
  },
  {
    id: Symbol(),
    title: "Machine learning for web accessibility",
    content: "Interacting with a website using your own body movements: through the device's webcam, the system can recognize postures or gestures of your choice; an action is associated for each of these gestures (scroll up, down, or zoom in)",
    icon: "#trophy",
    href: "https://a3-project.netlify.app/",
  },
  {
    id: Symbol(),
    title: "Fractal tree",
    content: "Exploring the idea of recursive component in Vue.js",
    icon: "#trophy",
    href: "https://fractal-tree-vue.netlify.app/",
  },
  {
    id: Symbol(),
    title: "A* pathfinder",
    content: "An interactive simulation of the A* pathfinder algorithm",
    icon: "#trophy",
    href: "https://apathfinder.netlify.app/",
  },
  {
    id: Symbol(),
    title: "Ray casting",
    content: "An interactive simulation of the Ray Casting algorithm",
    icon: "#trophy",
    href: "https://ray-casting.netlify.app/",
  },
  {
    id: Symbol(),
    title: "NPM Vue.js components library",
    content: "Small ready to use UI components library",
    icon: "#trophy",
    href: "https://www.npmjs.com/package/nicolo_cavalli_ui_lib",
  },
  {
    id: Symbol(),
    title: "2D vectors playground",
    content: "Interactive platform about 2D vectors",
    icon: "#trophy",
    href: "https://2dvectors.netlify.app/",
  },
]);

const window_w = ref(window.innerWidth);
const show_shuffle = computed(() => window_w.value > 900);

//==============================
// Functions
//==============================
function onResize() {
  window_w.value = window.innerWidth;
}

function onShuffle() {
  items.value = shuffle(items.value);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//==============================
// Life cycle
//==============================
onMounted(() => {
  window.addEventListener("resize", onResize);
});
onBeforeUnmount(() => {
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.shuffle-btn {
  position: fixed;
  bottom: 22px;
  right: 22px;
}
</style>

<template>
  <BaseLayout>
    <template #title>Projects</template>
    <template #default>
      <BentoGrid :items="items" />
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import BentoGrid from "@/components/BentoGrid.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const items = [
  {
    id: Symbol(),
    large: true,
    title: "Pegorer STA website",
    content:
      "Full responsive single page application with a structured multi steps contact form. Handled the SEO optimization",
    href: "https://www.pegorersta.it/",
    iframe: true,
  },
  {
    id: Symbol(),
    large: true,
    title: "Machine learning for web accessibility",
    content:
      "Interacting with a website using your own body movements: through the device's webcam, the system can recognize postures or gestures of your choice; an action is associated for each of these gestures (scroll up, down, or zoom in)",
    href: "https://a3-project.netlify.app/",
    iframe: true,
  },
  {
    id: Symbol(),
    title: "Fractal tree",
    content: "Exploring the idea of recursive component in Vue.js",
    href: "https://fractal-tree-vue.netlify.app/",
    iframe: true,
  },
  {
    id: Symbol(),
    large: true,
    title: "A* pathfinder",
    content: "An interactive simulation of the A* pathfinder algorithm",
    href: "https://apathfinder.netlify.app/",
    iframe: true,
  },
  {
    id: Symbol(),
    title: "Ray casting",
    content: "An interactive simulation of the Ray Casting algorithm",
    href: "https://ray-casting.netlify.app/",
  },
  {
    id: Symbol(),
    title: "NPM Vue.js components library",
    content: "Small ready to use UI components library",
    href: "https://www.npmjs.com/package/nicolo_cavalli_ui_lib",
    iframe: false,
  },
  {
    id: Symbol(),
    title: "2D vectors playground",
    content: "Interactive platform about 2D vectors",
    href: "https://2dvectors.netlify.app/",
  },
];
</script>

<style lang="scss" scoped>
</style>

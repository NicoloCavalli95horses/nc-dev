<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Projects</template>
    <template #default>
      <h2>A few things I have worked on over time</h2><br>
      <p>Including academic exercises and week-end's experiments</p>
      <br><br>
      <BentoGrid :items="items" />
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  current_w,
} from '@/utils/globals';

import BentoGrid from "@/components/BentoGrid.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const items = [
  {
    id: Symbol(),
    title: "Pegorer STA website",
    content: "Full responsive single page application with a structured multi steps contact form. Handled the SEO optimization",
    href: "https://www.pegorersta.it/",
    src: '/img/pegorersta.png',
  },
  {
    id: Symbol(),
    title: "Three.js learning path",
    content: "Documentation of progress in using the Three.js library",
    href: "https://threejs-learning.netlify.app/",
  },
  {
    id: Symbol(),
    title: "NPM Vue.js components library",
    content: "Small ready to use UI components library",
    href: "https://www.npmjs.com/package/nicolo_cavalli_ui_lib",
  },
  {
    id: Symbol(),
    title: "Machine learning for web accessibility",
    content: "Interacting with a website using your own body movements: through the device's webcam, the system can recognize postures or gestures of your choice; an action is associated for each of these gestures (scroll up, down, or zoom in)",
    href: "https://a3-project.netlify.app/",
    src: '/img/a3project.png',
  },
  {
    id: Symbol(),
    title: "Fractal tree",
    content: "Exploring the idea of recursive component in Vue.js",
    href: "https://fractal-tree-vue.netlify.app/",
    src: '/img/fractal.png',
  },
  {
    id: Symbol(),
    title: "A* pathfinder",
    content: "An interactive simulation of the A* pathfinder algorithm",
    href: "https://apathfinder.netlify.app/",
    src: '/img/apathfinder.png',
  },
  {
    id: Symbol(),
    title: "2D vectors playground",
    content: "Interactive platform about 2D vectors",
    href: "https://2dvectors.netlify.app/",
  },
  {
    id: Symbol(),
    title: "WS live chat",
    content: "Web Socket chat in Node.js",
    href: "https://ws-chat-ntws.onrender.com/",
  },
  {
    id: Symbol(),
    title: "Ray casting",
    content: "An interactive simulation of the Ray Casting algorithm",
    href: "https://ray-casting.netlify.app/",
  },
  {
    id: Symbol(),
    title: "Two players game",
    content: "Two players fighting game. A little exercise to master the Pinia state management system",
    href: "https://thelastwarrior.netlify.app/",
  },
];
</script>

<style lang="scss" scoped>
</style>

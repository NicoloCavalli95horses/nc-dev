<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Projects</template>
    <template #default>
      <h2>A few things I have worked on over time</h2><br>
      <p>Including academic exercises and week-end's experiments</p>
      <br><br>
      <p v-if="loading">Loading...</p>
      <BentoGrid v-else :items="items" />
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  onMounted
} from 'vue';
import {
  apiGetGithubData
} from '../utils/api.js';
import {
  current_w,
} from '@/utils/globals';

import BentoGrid from "@/components/BentoGrid.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const items   = ref( [] );
const loading = ref( true );
const ALLOWED_PROJECT = [ '2d-vectors', 'a3', 'fractal-tree', 'nc-dev', 'pego-website', 'KMS-web-testing', 'the-last-warrior-game', 'threejs-journey'];

//==============================
// Life cycle
//==============================
onMounted( async () => {
  const res = await apiGetGithubData();
  if (!res) { return; }

  items.value = res.filter(i => ALLOWED_PROJECT.includes(i.name)).map(i => {
    return {
      id: i.id,
      title: i.name,
      content: i.description,
      language: i.language || 'markdown',
      href: i.html_url,
      homepage: i.homepage,
      updated_at: i.updated_at
    }
  });
  loading.value = false;
});
</script>

<style lang="scss" scoped>
</style>

<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Projects</template>
    <template #default>
      <h2>A few things I have worked on over time</h2><br>

      <template v-for="section in groupedItems" :key="section.title">
        <h3 class="t-24">{{ section.title }}</h3>
        <p v-if="loading">Loading...</p>
        <BentoGrid v-else :items="section.filtered" />
      </template>

    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  computed,
  onMounted
} from 'vue';
import {
  apiGetGitHubData
} from '../utils/api.js';
import {
  current_w,
} from '@/utils/globals';

import BentoGrid from "@/components/BentoGrid.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Consts
//==============================
const items = ref([]);
const loading = ref(true);
const CACHE_KEY = 'github_projects';

const groupedItems = computed(() =>
items.value.length ?
  [
    {
      title: 'Websites',
      items: [
        'nc-dev',
        'fg-official',
        'pego-website',
      ]
    },
    {
      title: 'Academic projects',
      items: [
        'a3',
        'a-pathfinder',
        '2d-vectors',
        'fractal-tree',
        'eslint-custom-rules',
        'threejs-journey',
        'KMS-web-testing',
      ]
    },
    {
      title: 'Utilities',
      items: [
        'time-board',
      ]
    },
    {
      title: 'Games',
      items: [
        'the-last-warrior-game',
      ]
    }
  ].map(section => ({...section, filtered: items.value.filter(i => section.items.includes(i.title))})) : []
)

//==============================
// Functions
//==============================

async function getProjects() {
  // Check existing cache
  const cached = window.sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch data and cache it
  const data = await apiGetGitHubData();

  if (data) {
    // filter projects
    const filtered = data.map(i => {
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
    console.log(filtered)
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(filtered));
    return filtered;
  }
}


//==============================
// Life cycle
//==============================
onMounted(async () => {
  items.value = await getProjects();
  loading.value = false;
});

</script>

<style lang="scss" scoped></style>

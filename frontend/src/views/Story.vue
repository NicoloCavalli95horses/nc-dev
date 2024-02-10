<template>
  <BaseLayout>
    <template #title>My story</template>
    <template #default>
      <!-- <Timeline :items="items" /> -->
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import BaseLayout from '@/components/BaseLayout.vue';
import Timeline from '@/components/Timeline.vue';

//==============================
// Consts
//==============================
const items = [
  { id: Symbol(), year: "2014-2017", title: "Bachelor's Degree in Psychology", content: "lorem ipsum", icon: "#trophy"  },
  { id: Symbol(), year: "2018-2021", title: "Master's Degree in Human Computer Interaction", content: "lorem ipsum", icon: "#trophy" },
  { id: Symbol(), year: "2021-2022", title: "Executive Master's degree in Artificial intellicece for Human Science", content: "lorem ipsum", icon: "#trophy" },
  { id: Symbol(), year: '2022-today', title: "Web Developer (iCare)", content: 'lorem ipsum', icon: '#code' },
];
</script>

<style lang="scss" scoped>
</style>
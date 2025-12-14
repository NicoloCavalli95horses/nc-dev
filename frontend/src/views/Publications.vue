<template>
  <BaseLayout :hide_vertical="current_w < 600">
    <template #title>Publications</template>
    <template #default>
      <h2>List of publications</h2>
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
} from 'vue';
import {
  current_w,
} from '@/utils/globals';

import Btn from '@/components/Btn.vue';
import BaseLayout from '@/components/BaseLayout.vue';

//==============================
// Consts
//==============================


//==============================
// Functions
//==============================


</script>

<style lang="scss" scoped>

</style>
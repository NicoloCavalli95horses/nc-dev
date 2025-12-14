<template>
  <div class="breadcrumbs">
    <p @click="router.push({ path: '/blog' })">Blog</p>
    <span>|</span>
    <p v-if="title" class="active">
      {{ title.length < MAX_TITLE_LENGTH ? title : title.substring(0, MAX_TITLE_LENGTH) + "..." }}
    </p>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  onMounted
} from "vue";
import {
  useRouter,
} from "vue-router";

//==============================
// Props
//==============================
const props = defineProps({
  title: String,
});

//==============================
// Consts
//==============================
const router = useRouter();
const previousPage = ref(undefined);
const MAX_TITLE_LENGTH = 35;

//==============================
// Life cycle
//==============================
onMounted(() => {
  router.afterEach((_, from) => {
    previousPage.value = from.fullPath;
  });
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  margin: 0 0 24px 0;
  padding: 12px 0;
  @media screen and (min-width: 500px) { // from 500px up
    padding: 32px 0 12px 0;
  }
  p {
    cursor: pointer;
    &.active {
      color: var(--primary);
    }
  }
  span {
    margin: 0 8px;
  }
}
</style>
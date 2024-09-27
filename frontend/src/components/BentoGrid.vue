<template>
  <div class="bento-grid">
    <template v-for="item in items" :key="item.id">
      <a :href="item.href" class="item shadow">
        <div class="text">
          <label>{{ item.title }}</label>
          <p>{{ item.content }}</p>
        </div>
      </a>
      <Image class="item large" v-if="item.src" :src="item.src" :alt="item.title" :href="item.href" />
    </template>
  </div>
</template>

<script setup>
//==============================
// Imports
//==============================
import Image from './Image.vue';

//==============================
// Props and emits
//==============================
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});


</script>

<style lang="scss" scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 12px;
  padding: 10px;
  .item {
    background-color: var(--grey-28);
    border-radius: clamp(1em, 1vw, 2em);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.large {
      aspect-ratio: 16 / 9;
      @media screen and (min-width: 750px) {
        grid-column: span 2;
      }
    }
    .text {
      padding: 22px;
      p {
        margin-top: 4px;
      }
    }
  }
}
</style>

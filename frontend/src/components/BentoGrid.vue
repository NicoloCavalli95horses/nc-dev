<template>
  <div class="bento-grid">
    <template v-for="item in items" :key="item.id">
      <a :href="item.href" class="item shadow">
        <div class="text">
          <label>{{ item.title }}</label>
          <p>{{ item.content }}</p>
        </div>
      </a>
    </template>
  </div>
</template>

<script setup>
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 12px;
  padding: 10px;
  .item {
    border-radius: clamp(1em, 1vw, 2em);
    display: flex;
    flex-direction: column;
    .text {
      padding: 22px;
      label {
        min-height: 60px;
      }
      p {
        margin-top: 4px;
      }
    }
  }
}
</style>

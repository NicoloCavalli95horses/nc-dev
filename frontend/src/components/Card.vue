<template>
  <div class="event">
    <h2>{{ item.year }}</h2>
    <h3>{{ item.title }}</h3>
    <p>{{ item.content.paragraph }}</p>
    <ul v-if="item.content.list?.length">
      <li v-for="(i, j) in item.content.list" :key="j">{{ i }}</li>
    </ul>
    <div v-if="item.content.tags?.length" class="tags">
      <div class="tag" v-for="tag in item.content.tags" :key="tag">
        <label>{{ tag }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
//==============================
// Props and emits
//==============================
const props = defineProps({
  item: Object,
});

//==============================
// Consts
//==============================

//==============================
// Consts
//==============================
</script>

<style lang="scss" scoped>
.event {
  max-width: 980px;
  padding: 32px 0px;
  &:not(:last-of-type) {
    padding: 0 0 32px 0;
    border-bottom: 1px solid #282828;
  }
  p {
    margin-top: 12px;
  }
  .tags {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .tag {
      width: max-content;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      background-color: #303030;
      padding: 8px 12px;
      border-radius: var(--radius-xl);
    }
  }
}
</style>

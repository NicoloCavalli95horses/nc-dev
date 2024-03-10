<template>
  <div class="event">
    <h2>{{ item.year }}</h2>
    <h4>{{ item.title }}</h4>
    <h5>{{ item.location }}</h5>
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
  max-width: 800px;
  padding: 32px 0px;
  &:not(:last-of-type) {
    padding: 0 0 32px 0;
  }
  h2 {
    color: var(--grey-44);
  }
  h4 {
    margin: 10px 0 10px 0;
    color: var(--secondary);
    font-size: 2.6rem;
  }
  p {
    margin-top: 12px;
  }
  .tags {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
}
</style>

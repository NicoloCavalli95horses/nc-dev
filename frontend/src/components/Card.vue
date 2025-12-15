<template>
  <div class="event" ref="card_ref" :id="item.id">
    <h2>{{ item.year }}</h2>
    <h4>{{ item.title }}</h4>
    <div class="pin">
      <svg><use :href="item.location.icon"></use></svg>
      <h5>{{ item.location.text }}</h5>
    </div>
    <p v-html="item.content.paragraph" />
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
// Import
//==============================
import { ref } from 'vue';

//==============================
// Props and emits
//==============================
const props = defineProps({
  item: Object,
});

const card_ref = ref( undefined );

//==============================
// Expose
//==============================
defineExpose({
  card_ref,
});

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
  .pin {
    display: flex;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      margin: 0 8px 0 0;
    }
  }
  p, ul {
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

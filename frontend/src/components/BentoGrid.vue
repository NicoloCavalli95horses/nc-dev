<template>
  <div class="bento-grid">
    <template v-for="item in items" :key="item.id">
      <a :href="item.homepage" class="item shadow-xl">
        <div class="title">
          <label>{{ item.title }}</label>
        </div>
        <div class="content">
          <div>{{ item.content }}</div>
          <div class="footer">
            <div class="row">
              <label class="tag">{{ item.language }}</label>
              <div><a :href="item.href"><svg><use href="#github"></use></svg></a></div>
            </div>
            <div class="row">
              <div class="r-text w-100">Last update: {{ toDDMMYYYY(item?.updated_at) }}</div>
            </div>
          </div>
        </div>
      </a>
    </template>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  toDDMMYYYY,
} from '../utils/globals.js';

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
  padding: 10px 0;

  .item {
    border-radius: clamp(1em, 1vw, 2em);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    border: 6px solid var(--grey-28);
    background: linear-gradient(to bottom, rgba(0,0,0,0), var(--grey-28));
    .content {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      color: #fff;
      .footer {
        margin-top: 12px;
        display: grid;
        grid-gap: 10px;
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        font-size: 12px;
        color: var(--grey-40);
      }
    }
  }
}
</style>

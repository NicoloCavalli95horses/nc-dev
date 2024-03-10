<template>
  <div class="thumb" @click="$router.push({ path: `/blog/${item.id}` })">
    <div class="title">
      <h4>{{ item.title }}</h4>
      <div class="btns">
        <Btn icon :def="false" @click="(e) => { e.stopPropagation(); emit('edit'); }"><svg><use href="#edit"></use></svg></Btn>
        <Btn icon :def="false" @click="(e) => { e.stopPropagation(); emit('delete'); }"><svg><use href="#delete"></use></svg></Btn>
      </div>
    </div>
    <div class="body">
      <p>{{ item.description }}</p>
    </div>
    <div class="footer">
      <h5>{{ filterDate( item.updated_at ) }}</h5>
     <div v-if="item.tags" class="tags">
      <div class="tag" v-for="t in JSON.parse(item.tags)" :key="t">
        <label>{{ t }}</label>
      </div>
     </div>
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import { filterDate } from '@/utils/globals';
import Btn from './Btn.vue';

//==============================
// Props and emits
//==============================
defineProps({
  item: Object,
  placeholder: Boolean
});

const emit = defineEmits([
 'edit',
 'delete',
]);

//==============================
// Consts
//==============================


//==============================
// Functions
//==============================

</script>

<style lang="scss" scoped>
.thumb {
  width: 100%;
  cursor: pointer;

  h5 {
    font-size: 11px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      color: var(--secondary);
    }
    .btns {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 6px;
    }
  }
  .body {
    margin-top: 12px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    .tags {
      display: grid;
      grid-gap: 6px;
      grid-auto-flow: column;
    }
  }
}
</style>

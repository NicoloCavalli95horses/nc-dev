<template>
  <div class="thumb shadow" :class="{'hover': hover}" @click="onClick" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="title">
      <h4>{{ item.title }}</h4>
      <div v-if="isAdmin" class="btns">
        <Btn icon :def="false" @click="(e) => { e.stopPropagation(); emit('edit'); }">
          <svg><use href="#edit"></use></svg>
        </Btn>
        <Btn icon :def="false" @click="(e) => { e.stopPropagation(); emit('delete'); }">
          <svg><use href="#delete"></use></svg>
        </Btn>
      </div>
    </div>
    <div class="body">
      <p>{{ item.description }}</p>
    </div>
    <div class="footer">
      <h5>{{ filterDate( item.updated_at ) }}</h5>
     <div v-if="item.tags" class="tags">
      <div class="tag" v-for="t in item.tags" :key="t">
        <label>{{ t.name }}</label>
      </div>
     </div>
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  isAdmin,
  filterDate
} from '@/utils/globals';
import {
  ref,
} from 'vue';
import {
  useRouter,
} from 'vue-router';

import Btn from './Btn.vue';

//==============================
// Props and emits
//==============================
const props = defineProps({
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
const hover = ref( false );
const router = useRouter();

//==============================
// Functions
//==============================
function onClick() {
  router.push({ path: `/blog/${props.item.id}_${props.item.title}` });
}

</script>

<style lang="scss" scoped>
.thumb {
  width: 100%;
  cursor: pointer;
  padding: 12px 14px;
  box-sizing: border-box;
  border-radius: var(--radius-m);
  background-color: var(--grey-28);
  display: flex;
  flex-direction: column;

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
    flex-grow: 1;
    margin-top: 12px;
  }
  .footer {
    display: flex;
    align-items: end;
    justify-content: space-between;
    grid-gap: 6px;
    margin-top: 8px;
    .tags {
      display: grid;
      grid-gap: 6px;
      grid-auto-flow: column;
      justify-content: end;
    }
  }
}
</style>

<template>
  <div
    class="thumb shadow"
    :class="{'hover': hover, 'flash': flash_animation}"
    @click="onClick"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="inner-box">

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
  flash_animation: Boolean
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
  router.push( {path: `/blog/${props.item.id}_${props.item.title}`} );
}

</script>

<style lang="scss" scoped>
.thumb {
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  background-color: var(--grey-28);
  border: 1px solid var(--grey-22);
  border-radius: clamp(1em, 1vw, 2em);
  &.flash {
    animation-name: flash;
    animation-duration: 700ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .inner-box {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 180px;
    padding: 14px 16px;
    border-radius: clamp(1em, 1vw, 2em);
    &::after {
      position: absolute;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      content: "";
      width: 100%;
      height: 80px;
      bottom: 0px;
      left: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0), var(--grey-44));
    }
  }

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
    margin: 12px 0 12px 0;
    overflow: hidden;
    p {
      color: #fff;
    }
  }
  .footer {
    display: flex;
    align-items: end;
    justify-content: space-between;
    grid-gap: 6px;
    margin-top: 8px;
    z-index: 1;
    .tags {
      display: grid;
      grid-gap: 6px;
      grid-auto-flow: column;
      justify-content: end;
    }
  }
}


@keyframes flash {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.6;
  }
}

</style>

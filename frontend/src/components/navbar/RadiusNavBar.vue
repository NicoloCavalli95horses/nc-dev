<template>
  <nav :style="setNavStyle()">
    <div
      v-for="(i, idx) in items"
      :key="i.id"
      class="item"
      :class="{'active': active === i.id}"
      :style="setItemStyle(idx)"
    >
    <div class="text-box">
      <div @click="onItemClick(i)">{{ i.value[0].toUpperCase() + i.value.slice(1,i.value.length) }}</div>
      <div class="icon-box"><svg><use :href="i.icon"></use></svg></div>
    </div>
    </div>
  </nav>
</template>

<script setup>
//==================================
// Import
//==================================
import {
  ref,
  watch,
  computed,
} from "vue";

import router from "@/router/index";
import { current_w } from "@/utils/globals";


//==================================
// Props
//==================================
const props = defineProps({
  items: Array,
});


//==================================
// Consts
//==================================
const active       = ref( 'home' );
const show_sidebar = ref( false );
const routerQuery  = computed( () => router.currentRoute.value.name );
const routerParams = computed( () => router.currentRoute.value.params );

//==================================
// Functions
//==================================
function onItemClick(i) {
  active.value = i.id;
  show_sidebar.value = false;
  if (!i.subvalue) {
    router.push("/" + i.route);
  }
}

function setItemStyle(idx) {
  const radius = 90;
  const density = 0.3; // 0.5 = half circle
  const rot = current_w.value < 850 ? 180 : 125;
  const angle = rot + (360 / (props.items.length - 1)) * (idx * density);
  return {
    transform: `translate(0%, -50%) rotate(${angle}deg) translate(${radius}%, 0)`
  };
}

function setNavStyle(){
  if (current_w.value < 850) {
    return {"top": "95%", "left": "100%"}
  }
  return {"top": "50%", "right": "-150px"}
}


//==================================
// Watch
//==================================
watch( routerQuery, (newVal) => {
  if (active.value != newVal) {
    active.value = newVal;
  }
});

</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  z-index: 2;

  .item {
    position: absolute;
    top: 50%;
    right: 12px;
    display: flex;
    z-index: 2;
    &.active {
      .text-box {
        color: var(--primary);
        svg {
          color: inherit;
        }
      }
    }
    .text-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      transform: rotate(180deg);
      width: 200px;
      height: 40px;
      font-weight: bold;
      cursor: pointer;
      color: var(--font-light);
      font-size: 26px; 
      border-radius: 14px;
    &:after {
      content: '';
      width: 4px;
      height: 100%;
      background-color: var(--secondary);
    }
    }
  }
}
</style>
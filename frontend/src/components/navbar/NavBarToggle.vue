<template>
  <!-- Mobile menu -->
  <nav v-if="is_mobile" class="sidebar" :class="[show_sidebar ? 'open' : 'close']">
    <div v-for="i in items" :key="i.id" class="item mobile" :class="{ 'active': active === i.id }">
      <div class="icon-box">
        <svg><use :href="i.icon"></use></svg>
      </div>
      <div class="text-box" @click="onItemClick(i)">
        <h4>{{ i.value }} <span v-if="i.subvalue" class="sub-element">/ {{ i.subvalue.length < MAX_SUB_LENGTH ? i.subvalue : i.subvalue.substring(0, MAX_SUB_LENGTH) + "..." }}</span></h4>
      </div>
    </div>
  </nav>
  <!-- Desktop menu -->
  <nav>
    <div class="main-nav">
      <template v-if="is_mobile">
        <div class="w-50" />
        <div class="mobile-menu" @click="openSidebar">
            <svg>
              <use v-if="show_sidebar" href="#close"></use>
              <use v-else href="#menu"></use>
            </svg>
        </div>
      </template>
      <template v-else>
        <div class="w-50" />
        <div class="items shadow">
          <div v-for="i in items" :key="i.id" class="item" :class="{ 'active': active === i.id }">
            <h4 @click="onItemClick(i)">{{ i.value }}</h4>
          </div>
        </div>
      </template>
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
import { is_mobile } from "@/utils/globals";
import router from "@/router/index";


//==================================
// Props
//==================================
const props = defineProps({
  items: Array,
});

//==================================
// Consts
//==================================
const active       = ref( undefined );
const show_sidebar = ref( false );
const routerQuery  = computed( () => router.currentRoute.value.name );
const routerParams = computed( () => router.currentRoute.value.params );
const MAX_SUB_LENGTH = 20;

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

function openSidebar() {
  show_sidebar.value = !show_sidebar.value;
}

//==================================
// Watch
//==================================
watch( routerQuery, (newVal) => {
  if (active.value != newVal) {
    active.value = newVal;
  }
}, {immediate:true});

</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--bg-color);
  z-index: 10;
  .main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 22px;
    .items {
      display: flex;
      background-color: var(--grey-33);
      border-radius: var(--radius-xl);
      padding: 6px 16px;

      .item.active h4 {
        color: var(--primary);
        transition-duration: 400ms;
        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 50%);
          width: 4px;
          height: 4px;
          background-color: var(--primary);
          border-radius: 50%;
        }
      }
    }
    .mobile-menu {
      height: 28px;
      width: 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 8px solid transparent;
      cursor: pointer;
      .bar, .bar-small {
        background-color: var(--font-light);
        height: 2px;
      }
      .bar {
        width: 100%;
      }
      .bar-small {
        width: 80%;
      }
      .cross {
        position: absolute;
        top: 50%;
        background-color: var(--font-light);
        width: 30px;
        height: 2px;
        &.x {
          transform: rotate(45deg);
        }
        &.y {
          transform: rotate(-45deg);
        }
      }
    }
  }
}

.item {
  position: relative;
  white-space: nowrap;
  transition-duration: 400ms;
  cursor: pointer;
  padding: 10px;
  h4 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.6em;
    position: relative;
  }
  &.mobile {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    &.active {
      border: 1px solid var(--primary);
      border-radius: 44px;
    }
    .icon-box {
      display: grid;
      place-content: center;
      width: 10%;
    }
    .text-box {
      white-space: nowrap;
      width: 90%;
      padding: 0 8px;
      overflow: hidden;
      .sub-element {
        color: var(--primary);
        text-transform: lowercase;
      }
    }
  }
  &.active h4 {
    color: var(--primary);
  }
  &.active svg {
    color: var(--primary);
  }
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  z-index: 2;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 48px;
  .theme-toggle {
    position: absolute;
    bottom: 42px;
    right: 22px;
  }
  &.close {
    transform: translate(100%, 0);
    transition-duration: 400ms;
  }
  &.open {
    transform: translate(0%, 0);
    transition-duration: 400ms;
  }
  h4 {
    margin: 12px 0;
  }
}
</style>
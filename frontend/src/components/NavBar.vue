<template>
  <nav v-if="is_mobile" class="sidebar" :class="[show_sidebar ? 'open' : 'close']">
    <div v-for="i in items" :key="i.id" class="item" :class="{ 'active': active == i.id }">
      <h4 @click="onItemClick(i)">{{ i.value }}</h4>
    </div>
    <div class="letter">{{ active.substring(0,1).toUpperCase() }}</div>
  </nav>
  <nav>
    <div class="main-nav">
      <template v-if="is_mobile">
        <div class="w-50" />
        <div class="mobile-menu" @click="show_sidebar = !show_sidebar">
            <svg>
              <use v-if="show_sidebar" href="#close"></use>
              <use v-else href="#menu"></use>
            </svg>
        </div>
      </template>
      <template v-else>
        <div class="w-50" />
        <div v-for="i in items" :key="i.id" class="item" :class="{ 'active': active == i.id }">
          <h4 @click="onItemClick(i)">{{ i.value }}</h4>
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
// Consts
//==================================
const items = [
  { id: "home",     route: "",         value: "home" },
  { id: "story",    route: "story",    value: "story" },
  { id: "blog",     route: "blog",     value: "blog" },
  { id: "projects", route: "projects", value: "projects" },
  { id: "contacts", route: "contacts", value: "contacts" },
];

//==================================
// Consts
//==================================
const active       = ref( undefined );
const show_sidebar = ref(false);
const routerQuery = computed( () => router.currentRoute.value.name );

//==================================
// Functions
//==================================
function onItemClick(i) {
  active.value = i.id;
  router.push("/" + i.route);
  show_sidebar.value = false;
}

//==================================
// Watch
//==================================
watch( routerQuery, (newVal) => {
  if (active.value != newVal) {
    active.value = newVal;
  }
})
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--grey-22);
  z-index: 10;
  .main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 22px;
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
  margin: 0 6px;
  transition-duration: 400ms;
  cursor: pointer;
  padding: 10px;
  h4 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.6em;
    position: relative;
  }
  &.active h4 {
    color: var(--primary);
  }
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--grey-22);
  z-index: 9;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  .letter {
    position: fixed;
    bottom: 0;
    right: 10%;
    font-size: 135pt;
    color: var(--grey-28);
  }
}
</style>
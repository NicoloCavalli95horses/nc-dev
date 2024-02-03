<template>
  <nav>
    <div class="main-nav">
      <div class="w-50" />
      <div v-for="i in items" :key="i.id" class="item" :class="{ 'active' : active == i.id }">
        <p @click="onItemClick(i)">{{ i.value }}</p>
      </div>
    </div>
  </nav>
</template>

<script setup>
//==================================
// Import
//==================================
import { ref } from "vue";
import router from '../router/index';

//==================================
// Consts
//==================================
const items = [
  { id: 'home',       route: '',       value: 'home' },
  { id: 'education',  route: 'education',  value: 'education' },
  { id: 'experience', route: 'experience', value: 'experience' },
  { id: 'projects',   route: 'projects',   value: 'projects' },
];

//==================================
// Consts
//==================================
const active = ref( 'home' );


//==================================
// Functions
//==================================
function onItemClick(i) {
  active.value = i.id;
  router.push('/' + i.route );
}

</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  .main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 22px;
    .item {
      position: relative;
      white-space: nowrap;
      margin: 0 6px;
      transition-duration: 400ms;
      cursor: pointer;
      &.active p {
        color: var(--primary);
        transition-duration: 400ms;
        &::after {
          content: '';
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
  }
}
</style>
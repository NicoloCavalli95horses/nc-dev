<template>
    <div class="main-dd">
      <div class="dd-wrapper" :class="{ 'error' : error }" @click="show = !show">
        <p :class="{ 'error': error }">{{ items.find(item => item.id == active_id).val || placeholder }}</p>
        <svg :class="{ 'rotate' : show }"><use href="#arrow-right"></use></svg>
        <div v-if="show" class="items" :style="{ 'max-height' :  `calc(${max_options} * ${ DD_HEIGHT }` }">
          <div
            v-for="item of items"
            :key="item.id"
            class="item"
            :class="{ 'active' : active_id == item.id }"
            @click="(e) => onClick(e, item)"
          >
            <p class="l-12">{{ item.val }}</p>
            <svg v-if="active_id == item.id" class="r-12"><use href="#check"></use></svg>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // ==============================
  // Import
  // ==============================
  import {
    ref,
  } from "vue";
  
  
  // ==============================
  // Props
  // ==============================
  const props = defineProps({
    active_id: [String, Number],
    placeholder: {
      type: String,
      default: () => 'Select an option'
    },
    title: String,
    items: Array,
    error: Boolean,
    max_options: {
      type: Number,
      default: 4,
    }
  });
  
  const emit = defineEmits([
    "update:active_id",
    "unselect",
  ]);
  
  
  // ==============================
  // Consts
  // ==============================
  const DD_HEIGHT   = '5.2rem';
  const show        = ref( false );
  
  
  // ==============================
  // Functions
  // ==============================
  function onClick(e, item) {
    e.stopPropagation();
    show.value = false;
    if ( props.active_id == item.id ) {
      emit('unselect');
      emit("update:active_id", null);
    } else {
      emit("update:active_id", item.id);
    }
  }
  
  
  </script>
  
  <style lang="scss" scoped>
  .dd-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: v-bind('DD_HEIGHT');
    padding: 0 1.5rem;
    box-sizing: border-box;
    border-radius: var(--radius-m);
    cursor: pointer;
    user-select: none;
    background-color: var(--grey-33);
    &.error {
      border: 0.2rem solid var(--error);
    }
    .rotate {
      transition-duration: var(--transition-medium);
      transform: rotate(90deg);
    }
    p {
      &.error {
        color: var(--error);
      }
    }
    .items {
      position: absolute;
      width: 100%;
      top: calc( 100% + 1.2rem);
      left: 0;
      z-index: 1;
      overflow-y: auto;
      border-radius: var(--radius-s);
      box-shadow: rgba(0, 0, 0, 0.25) 0 0.4rem 1.2rem, rgba(0, 0, 0, 0.22) 0 0.2rem 0.2rem;
      color: var(--font-light);
  
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: v-bind('DD_HEIGHT');
        box-sizing: border-box;
        background-color: var(--grey-33);
        transition-duration: var(--transition-medium);
        &:hover {
          filter: brightness(110%);
          background-color: var(--primary);
          transition-duration: var(--transition-medium);
        }
        &.active {
          background-color: var(--primary);
        }
        p {
          &.error {
            color: var(--error);
          }
        }
      }
    }
  }
  </style>
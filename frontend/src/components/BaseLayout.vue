<template>
  <div class="main-layout">
    <div v-if="!hide_vertical" class="vertical">
      <h1 :class="{'typewriting-effect': animate_title}"><slot name="title" /></h1>
    </div>
    <div class="main" :class="{'margins': !hide_vertical}">
      <slot />
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================

//==============================
// Props and emits
//==============================
const props = defineProps({
  hide_vertical: Boolean,
  animate_title: Boolean,
});

</script>

<style lang="scss" scoped>
$h: 90px;

.main-layout {
  margin: $h 12px 42px 12px; //navbar
  @media screen and (min-width: 600px) { // from 600px up
    margin: $h 22px 22px 22px;
  }
  display: flex;
  .vertical {
    width: clamp(5rem, 7vw, 9rem);
    position: fixed;
    writing-mode: vertical-lr;
  }
  .main {
    width: 100%;
    overflow: hidden;
    @media screen and (min-width: 600px) {
      width: calc( 100% - 64px);
      padding: 32px 44px 0 44px;
    }
    @media screen and (max-width: 500px) {
      width: calc( 100% - 36px);
      margin: 0 18px;
    }
    &.margins {
      margin-left: clamp(5rem, 7vw, 9rem);
      padding: 32px 22px 0 42px;
    }
  }
}
</style>

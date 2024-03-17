<template>
  <div class="main-layout">
    <div class="vertical">
      <h1><slot name="title" /></h1>
    </div>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-layout {
  margin: 80px 12px 42px 12px; //navbar
  @media screen and (min-width: 600px) { // from 600px up
    margin: 80px 22px 22px 22px;
  }
  display: flex;
  .vertical {
    width: clamp(5rem, 7vw, 9rem);
    position: fixed;
    writing-mode: vertical-lr;
  }
  .main {
    width: 100%;
    margin-left: clamp(5rem, 7vw, 9rem);
    padding: 32px 22px 0 22px;
    overflow: hidden;
    @media screen and (min-width: 600px) {
      width: calc( 100% - 64px);
      padding: 32px 44px 0 44px;
    }
  }
}
</style>

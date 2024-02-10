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
    writing-mode: vertical-lr;
  }
  .main {
    width: 100%;
    margin: 0 12px;
    @media screen and (min-width: 600px) {
      width: calc( 100% - 64px);
      margin: 22px 32px;
    }
  }
}
</style>

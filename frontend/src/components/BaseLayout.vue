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
  margin: 100px 22px 0 22px; //navbar
  display: flex;
  .vertical {
    writing-mode: vertical-lr;
  }
  .main {
    width: 100%;
  }
}
</style>

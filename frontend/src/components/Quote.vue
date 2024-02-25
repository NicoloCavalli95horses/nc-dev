<template>
  <div class="main-quote">
    <header>
      <h2>every story</h2>
      <div class="circle" />
    </header>
    <div class="square">
      <h4>is a different</h4>
      <h3 class="reverse">story</h3>
      <h4 class="absolute">isn't that true?</h4>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.main-quote {
  width: 100%;
  height: 100%;
  min-height: 220px;
  max-height: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  header {
    position: relative;
    h2 {
      text-transform: uppercase;
      padding: 12px;
      letter-spacing: 6px;
    }
    .circle {
      position: absolute;
      right: 0;
      opacity: 0.8;
      width: 300px;
      height: 300px;
      background-color: var(--grey-33);
      clip-path: circle(50% at 100% 0%);
    }
  }
  .square {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-left: 18px solid var(--primary);
    position: relative;
    h4 {
      padding: 8px;
      &.absolute {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50%;
        text-align: right;
        border-bottom: 8px solid var(--primary);
      }
    }
    h3.reverse {
      flex-grow: 1;
      writing-mode: vertical-lr;
      text-transform: uppercase;
      text-align: right;
      padding: 8px 0;
    }
  }
}

</style>

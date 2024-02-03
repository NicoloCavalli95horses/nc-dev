<template>
  <div class="main-home">
    <div class="header">
      <h1>Hi, I'm Nicolò</h1>
      <h2>
        I am a <span class="selected">designer</span> and <span class="monospaced">developer</span>,<br>
        specialized in Web Development with Vue.js and Laravel.<br> <br>
        Let me tell you my story 
      </h2>
    </div>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================


//==============================
// Consts
//==============================

</script>

<style lang="scss" scoped>
.main-home {
  margin: 100px 22px 0 22px; //navbar
  .header {
    display: flex;
    h1 {
      writing-mode: vertical-lr;
    }
    h2 {
      margin: 22px 32px;
      line-height: 1.6;
      span {
        font-size: inherit;
        &.selected {
          border: 2px solid var(--primary);
          color: var(--primary);
          padding: 4px 6px;
          border-radius: 12px;
        }
        &.monospaced {
          font-family: monospace;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
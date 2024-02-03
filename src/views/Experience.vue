<template>
  <div class="main-home">
    <div class="header">
      <h1>Experience</h1>
      <h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, distinctio dignissimos? Laboriosam minima deserunt ducimus nam dolorem adipisci iste eaque dolores, laborum, consectetur blanditiis reprehenderit assumenda, error expedita ratione recusandae.
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

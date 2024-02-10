<template>
  <div class="bento-grid">
    <a
      :href="cell.href"
      class="cell"
      :class="{
        'large' : Math.random() > 0.5,
        'disabled' : !cell?.title
      }"
      v-for="cell in cells"
      :key="cell.id"
    >
      <div class="text">
        <h4>{{ cell?.title }}</h4>
        <p>{{ cell?.content }}</p>
      </div>
    </a>
  </div>
</template>

<script setup>
//==============================
// Imports
//==============================
import { computed } from "vue";

//==============================
// Props and emits
//==============================
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  show_filler: Boolean,
});

//==============================
// Consts
//==============================
const cells = computed(() => {
  const items = [ ...props.items];
  if ( !props.show_filler ) { return items; }
  const randomIndex = Math.floor(Math.random() * (items.length + 1));
  const max = Math.random() > 0.5 ? 3 : 4;
  for (let i = 0; i < max; i++ ){
    items.splice(randomIndex, 0, {id: Symbol()});
  }
  return items;
})

//==============================
// Watch
//==============================

</script>

<style lang="scss" scoped>
$box-w: 180px;
.bento-grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax($box-w, 1fr));
  grid-gap: clamp(1em, 1vw, 2em);
  align-items: center;
  .cell {
    background-color: #333;
    border-radius: clamp(1em, 1vw, 2em);
    height: calc($box-w*2);
    display: flex;
    flex-direction: column;
    .text {
      padding: 22px;
    }
     
    &.large {
      @media screen and (min-width: 800px) {
        grid-column: span 2;
      }
    }
    &.disabled {
      background-color: #333;
      opacity: 0.3;
    }
  }
}
</style>

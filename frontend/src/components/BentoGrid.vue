<template>
  <div class="bento-grid">
    <a
      :href="item.href"
      class="item"
      v-for="item in items"
      :key="item.id"
      >
      <!-- :class="{ 'large' : item.large, 'filler' : !item.title && !item.content }" -->
      <div class="text">
        <label>{{ item?.title }}</label>
        <p>{{ item?.content }}</p>
      </div>
      <iframe v-if="item?.iframe" :src="item.href" />
    </a>
  </div>
</template>

<script setup>
//==============================
// Imports
//==============================

//==============================
// Props and emits
//==============================
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
});

//==============================
// Consts
//==============================


//==============================
// Watch
//==============================

</script>

<style lang="scss" scoped>
$box-w: calc(1920px / 5);
$box-h: calc(1080px / 5);
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, $box-w);
  grid-gap: clamp(1em, 0.8vw, 2em);
  align-items: center;
  a.item {
    width: $box-w;
    height: $box-h;
    overflow: hidden;
    position: relative;
    background-color: #333;
    border-radius: clamp(1em, 1vw, 2em);
    display: flex;
    flex-direction: column;
    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      border: none;
      width: calc(1920px / 1.5);
      height: calc(1080px / 1.5);
      transform: translate(-50%, -50%) scale(0.30);
      pointer-events: none;
    }
    .text {
      padding: 22px;
    }
     
    &.filler {
      background-color: #333;
      opacity: 0.3;
    }
  }
}

</style>

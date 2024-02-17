<template>
  <svg class="ink-svg" viewBox="0 0 100 100">
    <filter :id="filter_id">
      <feTurbulence
        type="turbulence"
        baseFrequency="0.05"
        numOctaves="2"
        result="turbulence"
      />
      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        :scale="scale"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
    <circle
      cx="50%"
      cy="50%"
      r="50%"
      fill="var(--grey-33)"
      :style="{ filter: `url(#${filter_id})` }"
    />
  </svg>
</template>

<script setup>
//==============================
// Import
//==============================

//==============================
// Props and emits
//==============================
defineProps({
  scale: Number,
  filter_id: [Number, String],
});

//==============================
// Consts
//==============================
</script>

<style lang="scss" scoped>
  svg.ink-svg {
    width: 100%;
    height: 100%;
  }
</style>

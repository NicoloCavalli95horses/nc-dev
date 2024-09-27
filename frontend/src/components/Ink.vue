<template>
 <div class="ink-wrapper">
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
</div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue';


//==============================
// Consts
//==============================
const INK_SPEED = 2;

const scale     = ref( 150 );
const filter_id = ref( randId() );

let animation_direction = true;
let ink_interval = undefined;


//==============================
// Functions
//==============================
function randId() {
  const timestamp = new Date().getTime();
  const random = Math.random() * 10000;
  const uniqueId = `${timestamp}_${random}`;
  return uniqueId;
}

//==============================
// Life cycle
//==============================
onMounted(() => {
  ink_interval = setInterval(() => {
    if (animation_direction && scale.value < 150) {
      scale.value += INK_SPEED;
    } else if (!animation_direction && scale.value > 50) {
      scale.value -= INK_SPEED;
    } else {
      animation_direction = !animation_direction;
    }
    filter_id.value = randId();
  }, 120);
});

onBeforeUnmount(() => {
  clearInterval(ink_interval);
});
</script>

<style lang="scss" scoped>
  svg.ink-svg {
    width: 100%;
    height: 100%;
  }
</style>

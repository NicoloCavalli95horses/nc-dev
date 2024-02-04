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
    <div class="ink-wrapper">
      <svg viewBox="0 0 100 100">
        <filter :id="filter_id">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="2"
            result="turbulence" />
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            :scale="ink_scale"
            xChannelSelector="R"
            yChannelSelector="G" />
        </filter>
      <circle cx="50%" cy="50%" r="50%" :style="{ 'filter': `url(#${filter_id})` }" />
    </svg>
    </div>
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
} from "vue";


//==============================
// Consts
//==============================
const ink_scale = ref( 150 );
const INK_SPEED = 2;
const filter_id = ref(randId());
let ink_up = true;
let ink_interval = undefined;


//==============================
// Functions
//==============================
function randFrom(min, max) {
  return Math.random() * (max - min) + min;
}
function randId() {
  const timestamp = new Date().getTime();
  const random = Math.random() * 10000;
  const uniqueId = `${timestamp}_${random}`;
  return uniqueId;
}

//==============================
// Life cycle
//==============================
onMounted( () => {
  ink_interval = setInterval(() => {
    if (ink_up && ink_scale.value < 150) {
      ink_scale.value += INK_SPEED;
    } else if (!ink_up && ink_scale.value > 50) {
      ink_scale.value -= INK_SPEED;
    } else {
      ink_up = !ink_up;
    }
    filter_id.value = randId();
  }, 80)
});

onBeforeUnmount(() => {
  clearInterval( ink_interval );
})

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
  .ink-wrapper {
    position: absolute;
    width: 50vh;
    height: 50vh;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<template>
  <BaseLayout>
    <template #title>Hi, I'm Nicolo'</template>
    <template #default>
      <div class="content">
        <h2>
          I am a versatile and <span class="gradient-text">creative</span> mind<br>
          with a multidisciplinary background and a plethora of interests,<br>
          specialized in Web Development and User Interface design.
          <span v-if="!is_mobile"><br><br>I am currently pursuing a PhD in analyzing and improving web front-end testing techniques.</span>
        </h2>      
        <Btn class="top-24" @click="onDownload">Download CV</Btn>
      </div>

      <div class="ink-wrapper">
        <Ink :filter_id="filter_id" :scale="ink_scale" />
      </div>
    </template>
  </BaseLayout>
</template>

<script setup>
//==============================
// Import
//==============================
import { ref, onMounted, onBeforeUnmount } from "vue";
import { is_mobile } from '../utils/globals.js';
import BaseLayout from "@/components/BaseLayout.vue";
import Btn from "@/components/Btn.vue";
import Ink from "@/components/Ink.vue";

//==============================
// Consts
//==============================
const ink_scale = ref(150);
const INK_SPEED = 2;
const filter_id = ref(randId());
let ink_up = true;
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

function onDownload() {
  downloadAsset({file: 'nicolo_cavalli_cv.pdf'});
}

function downloadAsset({file}) {
  const file_path = `/download/${file}`;
  const a = document.createElement('a');
  a.href = file_path;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


//==============================
// Life cycle
//==============================
onMounted(() => {
  ink_interval = setInterval(() => {
    if (ink_up && ink_scale.value < 150) {
      ink_scale.value += INK_SPEED;
    } else if (!ink_up && ink_scale.value > 50) {
      ink_scale.value -= INK_SPEED;
    } else {
      ink_up = !ink_up;
    }
    filter_id.value = randId();
  }, 80);
});

onBeforeUnmount(() => {
  clearInterval(ink_interval);
});


</script>

<style lang="scss" scoped>
.content {
  z-index: 1;
  position: relative;
  h2 {
    span {
      font-size: inherit;
      &.gradient-text {
        background-image: linear-gradient(45deg, var(--grey-44), var(--secondary));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        padding: 4px 6px;
        border-radius: 12px;
        color: transparent;
      }
      &.monospaced {
        font-family: monospace;
        opacity: 0.5;
        letter-spacing: -1px;
        font-weight: 100;
      }
    }
    svg {
      font-size: 0;
    }
  }
  a.music-link {
    line-height: 1.6;
    font-size: 2.2rem;
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
}
</style>

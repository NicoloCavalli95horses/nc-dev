<template>
  <BaseLayout>
    <template #title>Hi, I'm Nicolò</template>
    <template #default>
      <div class="content">
        <h2>
          I am a <span class="selected">designer</span> and
          <span class="monospaced">&#60;developer&#47;&#62;</span><br />
          specialized in Web Development with Vue.js and Laravel.<br /><br />
          I like crafting simple and well-made UIs. As they say, art is all in
          the details...
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
}
</style>

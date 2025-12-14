<template>
  <BaseLayout>
    <template #title>Hi, I'm Nicolo'</template>
    <template #default>
      <div class="content">
        <h2>
          I am a versatile and <span class="gradient-text">creative</span> mind<br>
          with a multidisciplinary background and a plethora of interests,<br>
          specialized in Web Development and<br>User Interface design.
          <span v-if="!is_mobile"><br><br>I am currently pursuing a PhD in<br>web front-end security testing.</span>
        </h2>      
        <Btn class="top-24" @click="onDownload">Download CV</Btn>
      </div>
      <Ink />
    </template>
  </BaseLayout>
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
import {
  is_mobile,
  } from '../utils/globals.js';

import Ink from "@/components/Ink.vue";
import Btn from "@/components/Btn.vue";
import BaseLayout from "@/components/BaseLayout.vue";

//==============================
// Functions
//==============================
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
</style>

<template>
  <div class="img-wrapper">
    <div v-if="error" class="error-msg"><span>{{ error_msg || 'Error' }}</span></div>
    <template v-else>
      <div v-if="loading" class="loading" />
      <a v-show="!loading" :href="href">
        <img :src="src" :alt="alt" @load="onLoad" @error="onError">
      </a>
    </template>
  </div>
</template>

<script setup>
//==============================
// Import
//==============================
import {
  ref,
} from 'vue';

//==============================
// Props and emits
//==============================
const props = defineProps({
  src: String,
  alt: String,
  href: String,
  error_msg: String
});

const emit = defineEmits([
  'click',
  'load',
  'error'
]);

const loading = ref( true );
const error = ref( false );

//==============================
// Functions
//==============================
function onLoad() {
  loading.value = false;
  error.value = false;
  emit('load');
}

function onError() {
  error.value = true;
  loading.value = false;
  emit('error');
}

</script>

<style lang="scss" scoped>
.img-wrapper {
  .error-msg {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .loading {
    width: 100%;
    height: 100%;
    animation: pulse-bg 2s infinite ease-in-out;
  }

  img {
    width: 100%;
    height: auto;
  }
}

@keyframes pulse-bg {
  0% {
    background-color: #666;
  }
  50% {
    background-color: #444;
  }
  100% {
    background-color: #666;
  }
}
</style>
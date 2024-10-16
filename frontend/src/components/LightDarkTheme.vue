<template>
  <ToggleBtn v-model:active="dark_mode" :icon="dark_mode ? '#moon' : '#sun'" />
</template>

<script setup>
//==================================
// Import
//==================================
import {
  ref,
  watch,
  computed,
  onBeforeMount,
} from "vue";
import ToggleBtn from './ToggleBtn.vue';


//==================================
// Consts
//==================================
const dark_mode = ref( undefined );
const body = document.querySelector('body');

const isDarkTheme  = computed( () => window.matchMedia("(prefers-color-scheme: dark)").matches );
const isLightTheme = computed( () => window.matchMedia("(prefers-color-scheme: light)").matches );

//==================================
// Functions
//==================================
function setNewTheme(bol) {
  body.classList.toggle('dark-theme', bol);
  body.classList.toggle('light-theme', !bol);
}

//==================================
// Watch
//==================================
watch( dark_mode, (newVal) => {
  setNewTheme(newVal);
});

//==================================
// Life cycle
//==================================
onBeforeMount(() => {
  if (isDarkTheme.value) {
    dark_mode.value = true;
  } else if (isLightTheme.value) {
    dark_mode.value = false;
  } else {
    // No user preferences
    dark_mode.value = true;
  }
});

</script>

<style lang="scss" scoped>
</style>
<template>
  <a :href="href">
    <div class="img" :style="{'background-image' : `url(${src})`}" />
  </a>
</template>

<script setup>
//==============================
// Props and emits
//==============================
const props = defineProps({
  src: String,
  href: String,
});

</script>

<style lang="scss" scoped>
a {
  .img {
    width: 100%;
    height: 100%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>
<template>
  <div class="wrapper" :class="{ 'disabled': disabled }">
    <div class="dot-box" @click="onClick">
      <div class="dot" :class="{ 'active': active }" :style="{ 'left': active ? '50%' : '0%' }">
        <svg><use :href="icon"></use></svg>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
//===========================
// Props
//===========================
const props = defineProps({
  active: Boolean,
  disabled: Boolean,
  icon: String,
});

const emit = defineEmits([
  'update:active',
  'click',
]);


//===========================
// Functions
//===========================
function onClick() {
  emit('update:active', props.active ? false : true);
  emit('click');
}


</script>

<style lang="scss" scoped>
$w: 40px;
$p: 5px;

.wrapper {
  width: max-content;
  display: flex;
  align-items: center;
  .dot-box {
    width: calc(2 * $w);
    height: $w;
    background-color: var(--grey-33);
    border-radius: calc(2 * $w);
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    .dot {
      position: absolute;
      top: 0%;
      height: calc(100% - ($p * 2));
      width: calc(50% - ($p * 2));
      margin: $p;
      background: #fff;
      border-radius: 50%;
      transition-duration: var(--transition-medium);
      &.active {
        background-color: var(--secondary);
        svg {
          color: var(--font-light);
        }
      }
      svg {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--primary);
      }
    }
  }
}
</style>
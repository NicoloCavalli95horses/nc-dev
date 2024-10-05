<template>
  <teleport to=".modals">
    <div
      class="backdrop"
      @click="onBdClick"
      @mousewheel="(e) => e.preventDefault()"
    >
      <div
        ref="modal_ref"
        class="modal"
        data-cy="modal"
        :class="{ 'full-size': full_size }"
        :style="style"
        @click="(e) => e.stopPropagation()"
        @mousewheel="(e) => e.stopPropagation()"
      >
        <!-- header -->
        <header>
          <h3>
            <slot name="header" />
          </h3>
          <div v-if="close_btn" class="pointer" @click="emit('close')">
            <svg><use href="#x"></use></svg>
          </div>
        </header>
        <!-- scrollable-content -->
        <div class="body">
          <slot />
        </div>
        <!-- footer -->
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { computed } from "vue";

// ==============================
// Props
// ==============================
const props = defineProps({
  width: String,
  height: String,
  max_width: String,
  min_width: String,
  max_height: String,
  min_height: String,
  click_out_close: Boolean,
  full_size: Boolean,
  close_btn: Boolean,
});

const emit = defineEmits(["close"]);

const style = computed(() => {
  return {
    "max-width": props.max_width ? `calc(${props.max_width} - 4.4rem)` : "auto",
    "min-width": props.min_width ? `calc(${props.min_width} - 4.4rem)` : "auto",
    "max-height": props.max_height
      ? `calc(${props.max_height} - 4.4rem)`
      : "auto",
    "min-height": props.min_height
      ? `calc(${props.min_height} - 4.4rem)`
      : "auto",
    height: props.height ? `calc(${props.height} - 4.4rem)` : "auto",
    width: props.width ? `calc(${props.width} - 4.4rem)` : "auto",
  };
});

//==================================
// Functions
//==================================
function onBdClick() {
  if (props.click_out_close) {
    emit("close");
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: max-content;
    transform: translate(-50%, -50%);
    border-radius: var(--radius-s);
    padding: 2.2rem;
    background-color: var(--grey-22);
    box-shadow: var(--box-shadow);
    display: flex;
    flex-direction: column;
    header {
      width: calc(100% - 2.2rem);
      height: max-content;
      display: flex;
      justify-content: space-between;
      padding: 0 1.1rem;
    }
    .body {
      width: calc(100% - 2.2rem);
      overflow-y: auto;
      padding: 2.2rem 1.1rem;
      flex-grow: 1;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: max-content;
    }

    &.full-size {
      width: 100% !important;
      min-height: 100% !important;
      top: 0;
      left: 0;
      transform: none;
      box-sizing: border-box;
    }
  }
}
</style>

<template>
  <input
    type="text"
    autocomplete="none"
    :value="text"
    :required="is_required"
    :placeholder="placeholder"
    @input="$emit('update:text', $event.target.value)"
  />
</template>

<script setup>
// ==============================
// Props
// ==============================
const props = defineProps({
  text: String,
  placeholder: String,
  is_required: Boolean,
});

const emit = defineEmits([
  "update:text",
]);

</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  input,
  textarea {
    box-sizing: border-box;
    width: 100%;
    border-radius: 1.2rem;
    outline: none;
    border: 0.2rem solid transparent;
    caret-color: var(--primary);
    font-size: 1.8rem;
    &:focus {
      border: 0.2rem solid var(--primary);
    }
    &::placeholder {
      filter: grayscale(60%);
      opacity: 0.7;
    }
    &.error {
      border: 2px solid var(--error-color);
      &::placeholder {
        color: var(--error-color);
      }
    }
  }

  input {
    padding: 0 1.2rem;
    height: 3.5rem;
  }

  textarea {
    height: 10rem;
    padding: 1rem 1.2rem;
    resize: none;
    &::placeholder {
      filter: grayscale(60%);
      opacity: 0.7;
    }
  }

  .reset {
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    svg {
      color: var(--primary);
    }
  }

  .warning-text {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-2rem, -50%);
    pointer-events: none;
    touch-action: none;
    &.textarea {
      top: 0;
      transform: translate(-2rem, 2rem);
    }

    &.mobile {
      top: 50%;
      left: 0;
      transform: translate(2rem, -50%);
      &.textarea {
        top: 2rem;
      }
    }

    label {
      font-size: 1.3rem;
      color: var(--error-color);
    }
  }
}
.label-wrapper {
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.mobile {
    height: 4rem;
  }
}

.tips {
  position: absolute;
  width: 100%;
  z-index: 1;
  max-height: 20rem;
  cursor: pointer;
  user-select: none;
  overflow-y: scroll;
  box-shadow: var(--box-shadow);
  .tip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    box-sizing: border-box;
    background-color: var(--background);
    transition-duration: var(--transition-medium);
    &:hover {
      filter: brightness(110%);
      background-color: var(--primary);
      transition-duration: var(--transition-medium);
    }
    &:nth-of-type(odd):not(:hover) {
      background-color: var(--footer-bg);
    }
    &.active {
      background-color: var(--primary) !important;
    }
    p {
      margin-left: 1.8rem;
      text-transform: uppercase;
    }
  }
}
</style>
